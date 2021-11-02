import { useState } from 'react'
import SideNavbar from './sideNavbar'

const Navbar = ({ children }) => {
    // const strInOut = 'Login'   
    const [isMenuOpened, setIsMenuOpened] = useState(false)

    function toogleMenu() {
        const $sidebarList = document.getElementById('sidebarCol').classList
        $sidebarList.toggle('d-none')
        setIsMenuOpened(!isMenuOpened)
    }

    return (
        <>
            {/* Main navbar */}
            <div className="container-fluid px-0 mx-0">
                <div className="row gap-0">
                    <div id="sidebarCol" className="d-none col-2">
                        <SideNavbar></SideNavbar>
                    </div>
                    <div className="col">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
                            <button type="button"
                                id="btnCollapse"
                                className="btn btn-info"
                                onClick={toogleMenu}
                            >
                                {isMenuOpened ? <i class="bi bi-arrow-left"></i> : <i className="bi bi-list"></i>}
                            </button>
                            <h3 className="mx-auto">Budget Management</h3>
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