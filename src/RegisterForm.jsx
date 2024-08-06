import { useGlobalContext } from "./appContext";

const RegisterForm = () => {
    const {closeModal} = useGlobalContext();

    return (
        <div>
            <div>
                <h1>Register Form</h1>
                <button onClick={closeModal}>X</button>
            </div>
        </div>
    );
};

export default RegisterForm;