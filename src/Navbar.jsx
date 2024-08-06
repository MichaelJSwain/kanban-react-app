const Navbar = () => {
    return (
        <nav style={{display: "flex", justifyContent: "space-between", width: "100vw"}}>
            <h1>Kanban App</h1>
            <button className="btn">Add to do</button>
        </nav>
    );
};

export default Navbar;