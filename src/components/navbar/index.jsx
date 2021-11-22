import { useContext, useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "@Components/sideNavbar";
import Link from "@Components/link";

import AuthContext from "src/contexts/auth.context";
import UsersContext from "@Context/users.context";

const Navbar = ({ children }) => {
    const { user, logout, isLogged } = useContext(AuthContext)
    const { isFirstUser } = useContext(UsersContext)
    const [isMenuOpened, setIsMenuOpened] = useState(false);
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

    function handleLogout() {
        logout();               // Cerramos el user actual
        showMenu(false);        // Quitamos el menu lateral
    }

    function isInitialState() {
        if (isFirstUser && router.pathname === '/') return true
        return false
    }

    function unLogged() {
        if (!isFirstUser && !isLogged) return true
        return false
    }

    return (
        <>
            {/* Main navbar */}
            <div className="container-fluid">
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
                                hidden={!isLogged}>
                                {isMenuOpened ? (
                                    <i className="bi bi-arrow-bar-left"></i>
                                ) : (
                                    <i className="bi bi-list"></i>
                                )}
                            </button>
                            <div className="vstack text-center">
                                <Link href="/" className="h2 text-decoration-none text-dark">
                                    Budget Management App
                                </Link>
                                <div className="hstack gap-3 justify-content-center">

                                    <small className="text-white fst-italic">
                                        Fernando Veras · {" "}
                                        <small className="text-dark">&#169; 2021</small>
                                        {" "} · Santiago San Román
                                    </small>
                                </div>

                            </div>

                            {/* Button logout */}
                            {isLogged &&
                                <button
                                    className="btn btn-success"
                                    onClick={handleLogout}>
                                    <span className="badge rounded-pill bg-primary px-3 py-2">
                                        {user.nick}
                                    </span>
                                    {" - Logout"}
                                </button>
                            }

                            {/* Button Create MAIN ADMIN */}
                            {isInitialState() &&
                                <button
                                    className="btn btn-success"
                                    onClick={() => router.push("/signup")}>
                                    <div className="vstack">
                                        <span>* NO USERS *</span>
                                        <span>Create MAIN ADMIN</span>
                                    </div>
                                </button>
                            }

                            {/* Button login if USERS & NO user logged */}
                            {unLogged() &&
                                <button
                                    className="btn btn-success"
                                    onClick={() => router.push("/login")}>
                                    Login
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
