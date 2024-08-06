import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

const AppContext = ({children}) => {
   const [user, setUser] = useState(null);

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

    return (
        <UserContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export default AppContext;