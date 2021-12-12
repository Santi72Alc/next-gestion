import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-hot-toast'

import ActualUserContext from "src/context/actualUser.context";
import UsersContext from "src/context/users.context";
import localStorageServices from "@Services/localStorage.services";

import SideNavbar from "@Components/sideNavbar";
import Link from "@Components/link";

import BtnLogout from "@Components/buttons/BtnLogout";
import BtnFirstUser from "@Components/buttons/BtnFirstUser";
import BtnLogin from "@Components/buttons/BtnLogin";

const Navbar = ({ children }) => {
    const { user, logout, isLogged, setActualUser } = useContext(ActualUserContext)
    const { isFirstUser } = useContext(UsersContext)
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const router = useRouter()


    useEffect(() => {
        const lastUser = localStorageServices.getActualUser()
        if (!isLogged && lastUser?._id) {
            setActualUser(lastUser)
            router.replace("/")
        }
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
        toast.success(`See you soon, ${user.nick}`, {
            style: {
                backgroundColor: "lightblue",
                color: "black"
            }
        })
        logout();               // Cerramos el user actual
        showMenu(false);        // Quitamos el menu lateral
        router.replace("/")
    }

    return (
        <div className="container-fluid" >

            <div className="row">
                <div id="sidebarCol" className="col-auto p-0 d-none">
                    {isLogged && <SideNavbar></SideNavbar>}
                </div>
                <div className="col p-0">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 justify-content-end">

                        <button
                            type="button"
                            id="btnCollapse"
                            className="btn btn-info"
                            onClick={toogleMenu}
                            hidden={isFirstUser || !isLogged}
                        >
                            <i className={`bi ${isMenuOpened ? 'bi-arrow-bar-left' : 'bi-list'}`}></i>
                        </button>

                        <div className="text-center mx-auto">
                            <Link href="/" className="h2 text-decoration-none text-dark">
                                {/* <Image src="/Budget_Management.png" width="64" height="64" /> */}
                                Budget Management App
                            </Link>
                            <div className="text-white fst-italic">
                                Fernando Veras · {" "}
                                <small className="text-dark">&#169; 2021</small>
                                {" "} · Santiago San Román
                            </div>
                        </div>

                        <div >
                            {isFirstUser && router.pathname === '/' &&
                                <BtnFirstUser onClick={() => router.replace("/profile")} />
                            }

                            {!isFirstUser && isLogged &&
                                <BtnLogout name={user.nick} onClick={handleLogout} />
                            }
                            {!isFirstUser && !isLogged && router.pathname !== '/login' &&
                                <BtnLogin onClick={() => router.replace("/login")} />}
                        </div>

                    </nav>
                    <div className="p-2">{children}</div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
