
import styles from './families-row.module.css'
import familiesServices from '../../services/families.services'

function handleEdit(event) {
    const id = event.target.dataset.id || event.target.parentElement.dataset.id
    console.log(id);
    familiesServices.editFamily(id)
    
}

export default function FamiliesRow({ row }) {
    return (
        <tr>
            <td className={styles.actionsCol}>
                <button className="btn btn-info btn-sm" onClick={handleEdit} data-id={row.id}><i className="bi bi-pen"></i></button>
                <button className="btn btn-danger btn-sm" ><i className="bi bi-trash"></i></button>
            </td>
            <td className={styles.idCol}>{row.id}</td>
            <td>{row.name}</td>
        </tr>
    )
}
