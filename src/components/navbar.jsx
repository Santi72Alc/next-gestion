import { useEffect, useState } from 'react'
import SideNavbar from './sideNavbar'

const Navbar = ({ children }) => {
    // const strInOut = 'Login'   
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    const user = {
        nick: 'UserName',
        name: "Nombre de Usuario"
    }


    // useEffect( ()=> {

    // }, [isMenuOpened])


    // Show the menu button on the left
    function showMenu(show = true) {
        const $sidebarList = document.getElementById('sidebarCol').classList
        if (show) $sidebarList.remove('d-none')
        else $sidebarList.add('d-none')
        setIsMenuOpened(show)

    }

    // When press the menu button
    function toogleMenu() {
        showMenu(!isMenuOpened)
    }


    function login() {
        setIsLogged(true)
    }

    function logout() {
        setIsLogged(false)
        showMenu(false)
    }

    return (
        <>
            {/* Main navbar */}
            <div className="container-fluid mx-0">
                <div className="row">
                    <div id="sidebarCol" className="d-none col-2 px-0">
                        <SideNavbar></SideNavbar>
                    </div>
                    <div className="col mx-0 px-0">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
                            <button type="button"
                                id="btnCollapse"
                                className="btn btn-info"
                                onClick={toogleMenu}
                                hidden={!isLogged}
                            >
                                {isMenuOpened ? <i className="bi bi-arrow-bar-left"></i> : <i className="bi bi-list"></i>}
                            </button>
                            <div className="vstack text-center">
                            <h3>Budget Management App</h3>
                            <small className="text-muted">Fernando Veras & Santiago San Román</small>

                            </div>

                            {isLogged
                                ? <button className="btn btn-success"
                                    onClick={() => logout()}>
                                    <span className="badge rounded-pill bg-primary px-3">{user.nick}</span>
                                    {'  - Logout'}
                                </button>
                                : <button className="btn btn-info"
                                    onClick={() => login()}>
                                    {' Sign In'}
                                </button>
                            }
                        </nav>
                        <div className="col m-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar