import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";


const KanbanBoard = () => {
    const [todos, setTodos] = useState({
        todo: [
            {
                title: 'gym',
                description: 'healthhhh',
                stage: 'to do',
                _id: '66b109d8ac82e327ae249fcb'
              },
              {
                title: 'shopping',
                description: 'boring!',
                stage: 'to do',
                _id: '66b109f4ac82e327ae249fd8'
              }
        ],
        inProgress: [
            {
                title: 'running',
                description: 'wow',
                stage: 'in progress',
                _id: '66b109e8ac82e327ae249fd1'
              }
        ],
        completed: [
            {
                title: 'cleaning the house',
                description: 'cleean',
                stage: 'completed',
                _id: '66b109c7ac82e327ae249fc6'
              }
        ]
    });

    return (
        <div style={{display: "flex"}}>
            <KanbanColumn title="To do" items={todos.todo}/>
            <KanbanColumn title="In progress" items={todos.inProgress}/>
            <KanbanColumn title="Completed" items={todos.completed}/>
        </div>
    );
};

export default KanbanBoard;