import TodoItem from "./TodoItem";

const KanbanColumn = ({title, items}) => {
    console.log("items = ", items);

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