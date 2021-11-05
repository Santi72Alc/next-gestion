import FamiliesRow from "./families-row"

import styles from './families-list.module.css'



export default function FamiliesList({ data }) {
    return (
        <div className={styles.listContainer}>
            <div className=" my-3">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className={styles.actionsCol}>Actions</th>
                            <th className={styles.idCol}>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{
                        data.map((row, index) =>
                            <FamiliesRow row={row} key={index}></FamiliesRow>
                        )
                    }</tbody>
                </table>
            </div>
        </div>

    )
}
