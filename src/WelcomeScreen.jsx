import { useGlobalContext } from "./appContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const WelcomeScreen = () => {
    const {handleModalTrigger} = useGlobalContext();

    return (
        <div>
            <h1>Welcome to the kanban app</h1>
            <p>The efficient way to plan tasks and get stuff done.</p>
            <div>
                <button className="btn" onClick={() => handleModalTrigger(<LoginForm/>)}>Login</button>
                <button className="btn" onClick={() => handleModalTrigger(<RegisterForm/>)}>Register</button>
            </div>
        </div>
    );
};

export default WelcomeScreen;