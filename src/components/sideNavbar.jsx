import Link from 'next/link'


const SideNavbar = ({ side = 'left' }) => {
    return (
        <div className="bg-primary py-3">
            <h3 className="text-center">Menu</h3>
            <hr />
            <div className="vstack gap-3 mt-5 px-3">
                <Link href="/">
                    <a className="h4 text-center text-white">Main page</a>
                </Link>
                <details open>
                    <summary className="h4">Budgets</summary>
                    <div className="vstack gap-3 px-3 mt-3">
                        <Link href="/">
                            <a>Maintenance</a>
                        </Link>
                    </div>
                </details>
                <details>
                    <summary className="h4">Maintenance</summary>
                    <div className="vstack gap-3 px-3 mt-3">
                        <Link href="/">
                            <a>Customers</a>
                        </Link>
                        <Link href="/">
                            <a>Products</a>
                        </Link>
                        <Link href="/families">
                            <a>Products families</a>
                        </Link>
                    </div>
                </details>


                <div className="mt-4">
                    <a href="#"><i className="bi bi-person"></i> Profile</a>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar