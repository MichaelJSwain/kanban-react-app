import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

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

                let column;
                if (newTodo.stage === "to do") {
                    column = "todo";
                } else if (newTodo.stage === "in progress") {
                    column = "inProgress";
                } else {
                    column = "completed";
                }

                updatedUser.todos[column].push(newTodo);
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

   const handleModalTrigger = view => {
        setIsShowingModal(true);
        setModalView(view);
   }

   const closeModal = () => {
        setIsShowingModal(false);
        setModalView(null);
   }

    return (
        <UserContext.Provider value={{user, setUser, login, logout, register, createTodo, isShowingModal, modalView, closeModal, handleModalTrigger}}>
            {children}
        </UserContext.Provider>
    );
};

export default AppContext;