import { useGlobalContext } from "./appContext";

const LoginForm = () => {
    const {closeModal} = useGlobalContext();

    return (
        <div>
            <div>
                <h1>Login Form</h1>
                <button onClick={closeModal}>X</button>
            </div>
        </div>
    );
};

export default LoginForm;