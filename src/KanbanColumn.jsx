import TodoItem from "./TodoItem/TodoItem";

const KanbanColumn = ({title, items}) => {
    return (
        <div>
            <h1>{title}</h1>
            {items.map(item => {
                return <TodoItem key={item._id} item={item}/>
            })}
        </div>
    );
};

export default KanbanColumn;