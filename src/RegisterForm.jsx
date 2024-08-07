import { useState } from "react";
import { useGlobalContext } from "./appContext";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const {closeModal, register} = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();
        register(formData);
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
                <h1>Register Form</h1>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-section-container">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" autoComplete="true" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="form-section-container">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" autoComplete="true" value={formData.username} onChange={handleChange}/>
                </div>
                <div className="form-section-container">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" autoComplete="true" value={formData.password} onChange={handleChange}/>
                </div>
                <button>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;