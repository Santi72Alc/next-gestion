import { useState, useContext } from "react";
import { useRouter } from "next/router";
import SideNavbar from "../sideNavbar";
import UserContext from "../../context/user";

const Navbar = ({ children }) => {
    const { user, login, logout, isLoggedIn } = useContext(UserContext);
    const [isMenuOpened, setIsMenuOpened] = useState(user?.email);
    const router = useRouter()

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
        if (login()) {
            router.replace("/");
        }
    }

    function handleLogout() {
        logout();               // Cerramos el user actual
        showMenu(false);        // Quitamos el menu lateral
        router.push("/");       // Nos desplazamos a la ruta root
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
                                hidden={!user.email}>
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

                            {isLoggedIn &&
                                <button
                                    className="btn btn-success"
                                    onClick={handleLogout}>
                                    <span className="badge rounded-pill bg-primary px-3 py-2">
                                        {user.nick}
                                    </span>
                                    {" - Logout"}
                                </button>
                            }

                        </nav>
                        <div className="col m-3">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;