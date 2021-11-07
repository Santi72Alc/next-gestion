import Link from 'next/link'


const SideNavbar = () => {
    return (
        <div className="navbar bg-primary px-4">
            <div className="vstack gap-3">
                <h3 className="text-center my-3">Menu</h3>
                {/* <hr /> */}
                <Link href="/">
                    <a><i className="bi bi-house-fill"></i>Main page</a>
                </Link>
                <details open>
                    <summary className="text-dark"><i className="bi bi-file-earmark-text-fill"></i>Budgets</summary>
                    <div className="vstack gap-3 px-3 mt-3">
                        <Link href="#">
                            <a><i className="bi bi-file-earmark-ruled-fill"></i>Maintenance</a>
                        </Link>
                    </div>
                </details>
                <details>
                    <summary className="text-dark"><i className="bi bi-server"></i>Main files</summary>
                    <div className="vstack gap-3 px-3 mt-3">
                        <Link href="#">
                            <a><i className="bi bi-people-fill"></i>Users</a>
                        </Link>
                        <Link href="/customers">
                            <a><i className="bi bi-people-fill"></i>Customers</a>
                        </Link>
                        <Link href="#">
                            <a><i className="bi bi-gpu-card"></i>Products</a>
                        </Link>
                        <Link href="/families">
                            <a><i className="bi bi-pencil-square"></i>Prod. Families</a>
                        </Link>
                    </div>
                </details>
                <hr className="text-dark" />
                <div className="mb-4">
                    <Link href="#">
                        <a><i className="bi bi-person-fill"></i>Profile</a>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default SideNavbar