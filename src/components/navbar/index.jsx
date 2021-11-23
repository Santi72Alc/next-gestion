import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideNavbar from "@Components/sideNavbar";
import Link from "@Components/link";

import AuthContext from "src/contexts/auth.context";
import UsersContext from "@Context/users.context";
import BtnLogout from "@Components/buttons/BtnLogout";
import BtnFirstUser from "@Components/buttons/BtnFirstUser";
import BtnLogin from "@Components/buttons/BtnLogin";

const Navbar = ({ children }) => {
    const { user, logout, isLogged, getActualUser } = useContext(AuthContext)
    const { isFirstUser } = useContext(UsersContext)
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    // Show the menu button on the left
    function showMenu(show = true) {
        const $sidebarList = document.getElementById("sidebarCol").classList;
        show ? $sidebarList.remove("d-none") : $sidebarList.add("d-none");
        setIsMenuOpened(show);
        $sidebarList = null;
    }

    useEffect(() => {
        getActualUser()
        setInterval(() =>
            setIsLoading(false)
            , 300)
    }, [])

    // When press the menu button
    function toogleMenu() {
        showMenu(!isMenuOpened);
    }

    function handleLogout() {
        logout();               // Cerramos el user actual
        showMenu(false);        // Quitamos el menu lateral
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

                            {isLoading &&
                                <div className="h4 text-bold text-info">Loading...</div>
                            }
                            
                            {!isLoading &&
                                <div className="buttons">
                                    {/* Button Logout */}
                                    {isLogged && <BtnLogout name={user.nick} onClick={handleLogout} />}

                                    {/* Button login if USERS & NO user logged */}
                                    {!isLogged && <BtnLogin onClick={() => router.replace("/login")} />}

                                    {/* Button Create MAIN ADMIN */}
                                    {isFirstUser && router.pathname === '/' &&
                                        <BtnFirstUser onClick={() => router.replace("/signin")} />
                                    }
                                </div>
                            }

                        </nav>
                        <div className="col m-2">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
