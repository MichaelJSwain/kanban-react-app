import { useGlobalContext } from "../appContext";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import TodoForm from "../forms/TodoForm";
import "./Navbar.css";

const Navbar = () => {
    const {user, login, logout, createTodo, handleModalTrigger} = useGlobalContext();

    return (
        <nav className="navbar">
            <h1>Kanban App</h1>

            <div style={{display: "flex"}}>
                {user ? <>
                    <h5>{user.username.username}</h5>
                    <button className="btn" onClick={() => handleModalTrigger(<TodoForm/>)}>Add to do</button>
                    <button className="btn" onClick={logout}>Logout</button>
                </> : 
                <>
                 <button className="btn" onClick={() => handleModalTrigger(<LoginForm/>)}>Login</button>
                 <button className="btn" onClick={() => handleModalTrigger(<RegisterForm/>)}>Register</button>
                </>}
            </div>
        </nav>
    );
};

export default Navbar;