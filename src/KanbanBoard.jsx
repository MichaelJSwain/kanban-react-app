import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import axios from "axios";


const KanbanBoard = () => {
    const [todos, setTodos] = useState({
        todo: [],
        inProgress: [],
        completed: []
    });

    useEffect(() => {
        const fetchTodos = async () => {

            await axios.get("http://localhost:4040/kanban/user/66b0c72cbc888c0273f772e9/todos")
                .then(response => {
                    if (response.data.success) {
                        const newTodos = {...todos}
                        response.data.todos.forEach(todo => {
                            if (todo.stage === "to do") {
                                newTodos.todo.push(todo);
                            } else if (todo.stage === "in progress") {
                                newTodos.inProgress.push(todo);
                            } else if (todo.stage === "completed") {
                                newTodos.completed.push(todo);
                            }
                        });
                      
                        setTodos(newTodos);
                    }
                })
                .catch(e => {
                    console.log("error fetching todos");
                });
        };
        fetchTodos();
    }, []);

    return (
        <div style={{display: "flex"}}>
            <KanbanColumn title="To do" items={todos.todo}/>
            <KanbanColumn title="In progress" items={todos.inProgress}/>
            <KanbanColumn title="Completed" items={todos.completed}/>
        </div>
    );
};

export default KanbanBoard;