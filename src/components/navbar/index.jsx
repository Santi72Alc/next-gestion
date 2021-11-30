import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image"
import { toast } from 'react-hot-toast'

import ActualUserContext from "@Context/actualUser.context";
import UsersContext from "@Context/users.context";
import storageServices from "@Services/localStorage.services";

import SideNavbar from "@Components/sideNavbar";
import Link from "@Components/link";

import BtnLogout from "@Components/buttons/BtnLogout";
import BtnFirstUser from "@Components/buttons/BtnFirstUser";
import BtnLogin from "@Components/buttons/BtnLogin";

const Navbar = ({ children }) => {
    const { user, logout, isLogged, setActualUser } = useContext(ActualUserContext)
    const { isFirstUser } = useContext(UsersContext)
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const toastLoading = toast.loading("Loading...", { position: "top-center" })
        const newUser = storageServices.getActualUser()
        if (user && newUser && user._id !== newUser._id) {
            setActualUser(newUser, { keepAlive: newUser.keepAlive })
        }
        setTimeout(() => {
            setIsLoading(false)
            toast.remove(toastLoading)
        }, 450)
    }, [user])


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
                <div hidden={!isLogged}>
                    <div id="sidebarCol" className="d-none col-3 px-0" >
                        <SideNavbar></SideNavbar>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 justify-content-end">
                    <button
                        type="button"
                        id="btnCollapse"
                        className="btn btn-info"
                        onClick={toogleMenu}
                        hidden={!isLogged}
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

                    <div hidden={isLogged || isLoading}>
                        {isFirstUser && router.pathname === '/' &&
                            <BtnFirstUser onClick={() => router.replace("/firstuser")} />
                        }

                        {!isFirstUser && isLogged &&
                            <BtnLogout name={user.nick} onClick={handleLogout} />
                        }
                        {!isFirstUser && !isLogged &&
                            <BtnLogin onClick={() => router.replace("/login")} />}
                    </div>

                </nav>
                <div className="col m-2">{children}</div>
            </div>
        </>
    );
};

export default Navbar;
