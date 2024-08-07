import { useState } from "react";
import { useGlobalContext } from "./appContext";

const TodoItem = ({item}) => {
    const {deleteTodo} = useGlobalContext();
    const [isShowingDropdown, setIsShowingDropdown] = useState(0);

    const handleDropdownBtnInteraction = () => {
        setIsShowingDropdown(currentValue => {
            return currentValue === 0 ? 1 : 0;
        })
    };

    const handleUpdate = () => {
        console.log("updating item ", item._id);
    };

    const handleDelete = () => {
        console.log("deleteing item ", item._id);
    };

    return (
        <div style={{display: "flex", justifyContent: "space-around", background: "gray", padding: "10px", borderRadius: "10px"}}>
            <span>{item.title}</span>
            <div onMouseEnter={handleDropdownBtnInteraction} onMouseLeave={handleDropdownBtnInteraction}>
                <button >edit</button>
                <div style={{position: "absolute", opacity: isShowingDropdown, background: "white", borderRadius: "5px"}}>
                    <ul style={{listStyle: "none", textAlign: "left", padding: "0 20px", color: "black", height: "100px"}}>
                        <li style={{padding: "0 0 10px"}} onClick={handleUpdate}>edit</li>
                        <li style={{padding: "0 0 10px"}} onClick={() => deleteTodo(item)}>delete</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;