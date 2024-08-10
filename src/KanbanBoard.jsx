import { useEffect, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import axios from "axios";
import { useGlobalContext } from "./appContext";


const KanbanBoard = () => {
    const {user, setUser} = useGlobalContext();

    return (
        <div style={{display: "flex", justifyContent: "space-around"}}>
            <KanbanColumn title="To do" items={user.todos.todo || []}/>
            <KanbanColumn title="In progress" items={user.todos.inProgress || []}/>
            <KanbanColumn title="Completed" items={user.todos.completed || []}/>
        </div>
    );
};

export default KanbanBoard;