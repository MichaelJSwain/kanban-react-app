import { useState } from "react";
import { useGlobalContext } from "./appContext";

const UpdateForm = ({id, title, description, stage}) => {
    const [formData, setFormData] = useState({
        title,
        description,
        stage
    });
    const {closeModal, updateTodo} = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();
    
        const updatedTodo = {
            ...formData,
            _id: id
        };
        console.log("submitting: ", updatedTodo)
        updateTodo(updatedTodo, stage);
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
                <h1>Update Todo</h1>
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

export default UpdateForm;