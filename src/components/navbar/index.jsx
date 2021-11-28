import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-hot-toast'

import ActualUserContext from "@Context/actualUser.context";
import UsersContext from "@Context/users.context";

import SideNavbar from "@Components/sideNavbar";
import Link from "@Components/link";

import BtnLogout from "@Components/buttons/BtnLogout";
import BtnFirstUser from "@Components/buttons/BtnFirstUser";
import BtnLogin from "@Components/buttons/BtnLogin";

const Navbar = ({ children }) => {
    const { user, logout, isLogged } = useContext(ActualUserContext)
    const { isFirstUser } = useContext(UsersContext)
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const toastLoading = toast.loading("Loading...", { position: "top-center" })
        setTimeout(() => {
            setIsLoading(false)
            toast.remove(toastLoading)
        }, 450)
    }, [])


    // Show the menu button on the left
    function showMenu(show = true) {
        const $sidebarList = document.getElementById("sidebarCol").classList;
        show ? $sidebarList.remove("d-none") : $sidebarList.add("d-none");
        setIsMenuOpened(show);
    }

    // When press the menu button
    function toogleMenu() {
        showMenu(!isMenuOpened);
    }

    function handleLogout() {
        toast.success(`See you soon, ${user.nick}`)
        logout();               // Cerramos el user actual
        showMenu(false);        // Quitamos el menu lateral
        router.replace("/")
    }

    return (
        <>
            {/* Main navbar */}
            <div className="container-fluid">
                <div className="row ">
                    {user &&
                        <div id="sidebarCol" className="d-none col-3 px-0">
                            <SideNavbar></SideNavbar>
                        </div>
                    }
                    <div className="col mx-0 px-0">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
                            <button
                                type="button"
                                id="btnCollapse"
                                className="btn btn-info"
                                onClick={toogleMenu}
                                hidden={!isLogged}>
                                <i className={`bi ${isMenuOpened ? 'bi-arrow-bar-left' : 'bi-list'}`}></i>
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

                            {!isLoading &&
                                <div className="mx-auto my-2 my-sm-0">

                                    {isFirstUser && router.pathname === '/' &&
                                        <BtnFirstUser onClick={() => router.replace("/firstuser")} />
                                    }

                                    {!isFirstUser && isLogged &&
                                        <BtnLogout name={user.nick} onClick={handleLogout} />
                                    }
                                    {!isFirstUser && !isLogged &&
                                        <BtnLogin onClick={() => router.replace("/login")} />}
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
