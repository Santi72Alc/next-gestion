import { useState, useContext } from "react";
import Router from "next/router";
import SideNavbar from "./sideNavbar";
import UserContext from "../context/user";

const Navbar = ({ children }) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const { user, logout } = useContext(UserContext);
    const [actualRoute, setActualRoute] = useState("")


    // Show the menu button on the left
    function showMenu(show = true) {
        const $sidebarList = document.getElementById("sidebarCol").classList;
        show ? $sidebarList.remove("d-none") : $sidebarList.add("d-none");
        setIsMenuOpened(show);
        $sidebarList = null;
    }

    // When press the menu button
    function toogleMenu() {
        showMenu(!isMenuOpened);
    }

    function handleLogin() {
        Router.push("/login")
    }

    function handleLogout() {
        logout();               // Cerramos el user actual
        showMenu(false);  
        if (window.history.length > 1)      // Quitamos el menu lateral
            Router.back()
        else 
            Router.push("/");       // Nos desplazamos a la ruta root
    }

    return (
        <>
            {/* Main navbar */}
            <div className="container-fluid mx-0">
                <div className="row ">
                    <div id="sidebarCol" className="d-none col-3 px-0">
                        <SideNavbar></SideNavbar>
                    </div>
                    <div className="col mx-0 px-0">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
                            <button
                                type="button"
                                id="btnCollapse"
                                className="btn btn-info"
                                onClick={toogleMenu}
                                hidden={!user}>
                                {isMenuOpened ? (
                                    <i className="bi bi-arrow-bar-left"></i>
                                ) : (
                                    <i className="bi bi-list"></i>
                                )}
                            </button>
                            <div className="vstack text-center">
                                <h3>Budget Management App</h3>
                                <small className="text-dark">
                                    Fernando Veras & Santiago San Román
                                </small>
                            </div>

                            {user ? (
                                <button
                                    className="btn btn-success"
                                    onClick={handleLogout}>
                                    <span className="badge rounded-pill bg-primary px-3 py-2">
                                        {user?.nick}
                                    </span>
                                    {" - Logout"}
                                </button>
                            ) :
                                true && (
                                    <button
                                        className="btn btn-info"
                                        onClick={handleLogin}>
                                        {" Login"}
                                    </button>
                                )
                            }
                        </nav>
                        <div className="col m-3">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};


// Navbar.getStaticProps = async (ctx) => {
//     const { pathname } = ctx

//     console.log("->", pathname);
// }

export default Navbar;
