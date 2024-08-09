import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

const getColumnKey = stage => {
    if (stage === "to do") {
        return "todo";
    } else if (stage === "in progress") {
        return "inProgress";
    } else if (stage === "completed") {
        return "completed";
    } 
}

const AppContext = ({children}) => {
   const [user, setUser] = useState(null);
   const [isShowingModal, setIsShowingModal] = useState(false);
   const [modalView, setModalView] = useState(null); 

   const login = async ({username, password}) => {
        axios.post("http://localhost:4040/kanban/user/login", {username, password})
        .then(response => {
            console.log(response);
            if (response.data.success) {
                closeModal();

                const fetchedUser = {
                    email: response.data.user.email,
                    username: response.data.user,
                    todos: {
                        todo: [],
                        inProgress: [],
                        completed: []
                    },
                    _id: response.data.user._id
                }

                response.data.user.todos.forEach(todo => {
                    if (todo.stage === "to do") {
                        fetchedUser.todos.todo.push(todo);
                    } else if (todo.stage === "in progress") {
                        fetchedUser.todos.inProgress.push(todo);
                    } else if (todo.stage === "completed") {
                        fetchedUser.todos.completed.push(todo);
                    } 
                })

                console.log("fetched user = ", fetchedUser);
                setUser(fetchedUser);
            }
        })
        .catch(e => {
            console.log("error logging in... ", e);
        })
   }

   const logout = async () => {
    setUser(null);
   }

   const register = async ({email, username, password}) => {
        console.log("registering...", email, username, password);
        axios.post("http://localhost:4040/kanban/user/register", {email, username, password})
            .then(response => {
                if (response.data.success) {
                    const {email, username, _id, todos} = response.data.user;
                    setUser({
                        email,
                        username,
                        _id,
                        todos
                    });
                    closeModal();
                }
            })
            .catch(e => {
                console.log("error registering user", e);
            })
   }

   const createTodo = async ({title, description, stage}) => {
        const newTodo = {
            title,
            description,
            stage,
            _id: v4().toString()
        };

        // update UI
        if (user) {
            setUser(currentUser => {
                const updatedUser = {
                    ...currentUser
                };

                const columnKey = getColumnKey(newTodo.stage);

                updatedUser.todos[columnKey].push(newTodo);
                return updatedUser;
            });
        }

        // persist data
        axios.post(`http://localhost:4040/kanban/user/${user._id}/todos`, newTodo)
            .then(response => {
                console.log("response = ", response);
                closeModal();
            })
            .catch(e => {
                console.log("error creating new to do ", e);
            });
   }

   const deleteTodo = async (todo) => {
        // UI update
        const columnKey = getColumnKey(todo.stage);
        
        const filtered = user.todos[columnKey].filter(item => {
            return item._id !== todo._id;
        });
        
        const updatedUser = {
            ...user
        };
        updatedUser.todos[columnKey] = filtered;

        setUser(updatedUser);

        // persist changes
        axios.delete(`http://localhost:4040/kanban/user/${user._id}/todos/${todo._id}`)
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
   }

   const updateTodo = async (todo, stage) => {
        // UI update
        const columnKey = getColumnKey(stage);

        if (stage === todo.stage) {
            const updatedTodoColumn = user.todos[columnKey].map(item => {
                if (item._id === todo._id) {
                    return todo;
                } else {
                    return item;
                }
            });
            
            const updatedTodos = {...user.todos};
            updatedTodos[columnKey] = updatedTodoColumn;

            setUser({
                ...user,
                todos: updatedTodos
            });
        } else {
           const newColumnKey = getColumnKey(todo.stage);

            const updatedTodos = {...user.todos};
            updatedTodos[columnKey] = updatedTodos[columnKey].filter(item => {
                return item._id !== todo._id;
            });

            updatedTodos[newColumnKey].push(todo);

            setUser({
                ...user,
                todos: updatedTodos
            });
        }

        closeModal();

        // persist changes
        axios.put(`http://localhost:4040/kanban/user/${user._id}/todos/${todo._id}`, todo)
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log("error persisting todo updates ", e);
            });
   }
 
   const handleModalTrigger = view => {
        setIsShowingModal(true);
        setModalView(view);
   }

   const closeModal = () => {
        setIsShowingModal(false);
        setModalView(null);
   }

    return (
        <UserContext.Provider value={{user, setUser, login, logout, register, createTodo, deleteTodo, updateTodo, isShowingModal, modalView, closeModal, handleModalTrigger}}>
            {children}
        </UserContext.Provider>
    );
};

export default AppContext;