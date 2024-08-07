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
              <div className="modal-header">
                <h1>Todo Form</h1>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-section-container">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" autoComplete="true" value={formData.title} onChange={handleChange}/>
                </div>
                <div className="form-section-container">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" autoComplete="true" value={formData.description} onChange={handleChange}/>
                </div>
                <div className="form-section-container">
                    <label htmlFor="stage">Stage:</label>
                    <input type="password" name="stage" id="stage" autoComplete="true" value={formData.stage} onChange={handleChange}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default TodoForm;