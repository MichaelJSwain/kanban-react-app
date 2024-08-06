import { useGlobalContext } from "./appContext";

const Navbar = () => {
    const {user, login, logout} = useGlobalContext();

    return (
        <nav style={{display: "flex", justifyContent: "space-between", width: "100vw", alignItems: "center"}}>
            <h1>Kanban App</h1>

            <div style={{display: "flex"}}>
                {user ? <>
                    <h5>{user.username.username}</h5>
                    <button className="btn">Add to do</button>
                    <button className="btn" onClick={logout}>Logout</button>
                </> : 
                <>
                 <button className="btn" onClick={login}>Login</button>
                </>}
                
   
            </div>
            
        </nav>
    );
};

export default Navbar;