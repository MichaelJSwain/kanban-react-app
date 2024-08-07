import { useState } from "react";
import { useGlobalContext } from "./appContext";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const {closeModal, login} = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();

        login(formData);
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div>
                <h1>Login Form</h1>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" autoComplete="true" value={formData.username} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" autoComplete="true" value={formData.password} onChange={handleChange}/>
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;