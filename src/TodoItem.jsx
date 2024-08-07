import { useState } from "react";

const TodoItem = ({item}) => {
    const [isShowingDropdown, setIsShowingDropdown] = useState(0);

    const handleDropdownBtnInteraction = () => {
        setIsShowingDropdown(currentValue => {
            return currentValue === 0 ? 1 : 0;
        })
    };

    return (
        <div style={{display: "flex", justifyContent: "space-around", background: "gray", padding: "10px", borderRadius: "10px"}}>
            <span>{item.title}</span>
            <div onMouseEnter={handleDropdownBtnInteraction} onMouseLeave={handleDropdownBtnInteraction}>
                <button >edit</button>
                <div style={{position: "absolute", opacity: isShowingDropdown, background: "white", borderRadius: "5px"}}>
                    <ul style={{listStyle: "none", textAlign: "left", padding: "0 20px", color: "black"}}>
                        <li style={{padding: "0 0 10px"}}>edit</li>
                        <li style={{padding: "0 0 10px"}}>delete</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;