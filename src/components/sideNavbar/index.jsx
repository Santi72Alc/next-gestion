import Link from '../link'

import styles from './sidenavbar.module.css'

const SideNavbar = () => {
    return (
        <div className="navbar bg-primary px-4">
            <div className="vstack gap-3">
                <h3 className="text-center my-3">Menu</h3>
                {/* <hr /> */}
                <Link href="/" className={styles.link}>
                    <i className="bi bi-house-fill"></i>Main page
                </Link>
                <details open>
                    <summary className={`${styles.summary}`}><i className="bi bi-file-earmark-text-fill"></i>Budgets</summary>
                    <div className="vstack gap-3 px-3 mt-3">
                        <Link href="#" className={styles.link}>
                            <i className="bi bi-file-earmark-ruled-fill"></i>Maintenance
                            </Link>
                    </div>
                </details>
                <details>
                    <summary className={`${styles.summary} text-`}><i className="bi bi-server"></i>Main files</summary>
                    <div className="vstack gap-3 px-3 mt-3">
                        <Link href="#" className={styles.link}>
                            <i className="bi bi-people-fill"></i>Users
                        </Link>
                        <Link href="/customers" className={styles.link}>
                            <i className="bi bi-people-fill"></i>Customers
                        </Link>
                        <Link href="#" className={styles.link}>
                            <i className="bi bi-gpu-card"></i>Products
                        </Link>
                        <Link href="/families" className={styles.link}>
                            <i className="bi bi-pencil-square"></i>Prod. Families
                        </Link>
                    </div>
                </details>
                <hr className={"text-dark"} />
                <div className="mb-4">
                    <Link href="#" className={styles.link}>
                        <i className="bi bi-person-fill"></i>Profile
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default SideNavbar