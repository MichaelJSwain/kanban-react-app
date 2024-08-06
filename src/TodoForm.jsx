import { useState } from "react";
import { useGlobalContext } from "./appContext";

const TodoForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        stage: ""
    });
    const {closeModal, register, createTodo} = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();
        createTodo(formData);
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <div>
              <div>
                <h1>Todo Form</h1>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="stage">Stage:</label>
                    <input type="password" name="stage" value={formData.stage} onChange={handleChange}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default TodoForm;