import { useGlobalContext } from "./appContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import TodoForm from "./TodoForm";

const Navbar = () => {
    const {user, login, logout, createTodo, handleModalTrigger} = useGlobalContext();

    return (
        <nav style={{display: "flex", justifyContent: "space-between", width: "100vw", alignItems: "center"}}>
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