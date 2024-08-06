import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

const AppContext = ({children}) => {
   const [user, setUser] = useState(null);
   const [isShowingModal, setIsShowingModal] = useState(false);
   const [modalView, setModalView] = useState(null); 

   const login = async () => {
        axios.post("http://localhost:4040/kanban/user/login", {
            "username": "tim",
            "password": "tim"
        })
        .then(response => {
            console.log(response);
            if (response.data.success) {
                

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

   const register = async () => {
    console.log("registering...");
   }

   const createTodo = async () => {
        const newTodo = {
            title: "Book AirBnBs",
            description: "for Canada trip",
            stage: "completed",
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
            })
            .catch(e => {
                console.log("error creating new to do ", e);
            })
   }

   const handleModalTrigger = view => {
        setIsShowingModal(true);
        setModalView(view);
   }

    return (
        <UserContext.Provider value={{user, setUser, login, logout, register, createTodo, isShowingModal, modalView, handleModalTrigger}}>
            {children}
        </UserContext.Provider>
    );
};

export default AppContext;