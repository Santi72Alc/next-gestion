import { useContext, useEffect, useState } from "react"
import Link from 'next/link'

import Modal from 'react-modal'

import UsersContext from "src/context/users.context"
import ActualUserContext from "@Context/actualUser.context"

// import styles from './users.module.css'
import toast from "react-hot-toast"
import InfoProfile from "@Components/users/infoProfile"
import { ROLES } from "@Services/constants"

const ACTIONS = {
    Open: "Open",
    Edit: "Edit",
    Delete: "Delete",
    MakeAdmin: "MakeAdmin"
}

export default function index() {
    const { isMainAdmin, user: actualUser } = useContext(ActualUserContext)
    const { users, getUserById, setFilterToUsers, updateUsersInfo } = useContext(UsersContext)
    const [localUsers, setLocalUsers] = useState([])
    const [txtFilter, setTxtFilter] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userSelected, setUserSelected] = useState(users[0])


    useEffect(() => {
        const toastLoading = toast.loading("Loading...")
        setLocalUsers(users)
        toast.dismiss(toastLoading)
    }, [users])


    function handleAction(e, id = "") {
        Modal.setAppElement("#root")
        const action = e.target?.dataset?.action || e.target?.parentElement?.dataset?.action

        if (action === ACTIONS.Open) {
            const userSelected = localUsers.find(user => user._id === id)

            if (userSelected) {
                setUserSelected(userSelected)
                setIsModalOpen(true)
            }

        }

        console.log("Action: ", action)
        // console.log("User: ", getUserById(id))
    }

    function handleSearch(e) {
        const filter = e.target.value
        setTxtFilter(filter)
        if (!filter) setLocalUsers(users)
        else setLocalUsers(setFilterToUsers({ localUsers, filter }))
    }

    return (
        <>
            <div className="container-fluid" id="root">

                {/* Title */}
                <header className="row mb-3">
                    <div className="col">
                        <h3>List of users</h3>
                        <p>Users: {localUsers.length}</p>
                    </div>

                    <div className="col-12 col-md-3 ">
                        <div className="vstack gap-2">
                            <div className="input-group flex-nowrap">
                                <span className={`input-group-text ${!txtFilter
                                    ? ''
                                    : localUsers.length
                                        ? 'bg-success text-white'
                                        : 'bg-danger text-white'}`
                                }>
                                    {!txtFilter
                                        ? <i className="bi bi-search"></i>
                                        : localUsers.length
                                            ? <i className="bi bi-check2"></i>
                                            : <i className="bi bi-x-circle"></i>
                                    }
                                </span>
                                <input type="text"
                                    id="filterInput"
                                    className="form-control"
                                    value={txtFilter}
                                    onChange={handleSearch}
                                    placeholder="Search..." />
                            </div>
                            <Link href="/users/new">
                                <a className="btn btn-success">New user</a>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Table */}
                <div className="">
                    <table className="w-100 px-2">

                        {/* Table head */}
                        <thead>
                            <tr className="row">
                                <th className="col-4 col-md-2 text-center">Actions</th>
                                <th className="col-2">Role</th>
                                <th className="col">(<small className="fst-italic"> Nick </small>) Full name</th>
                                <th className="col-3">Email</th>
                            </tr>
                        </thead>

                        {/* Table data */}
                        <tbody>
                            {localUsers && localUsers.map((user) =>
                                <tr className="row d-flex align-items-center" key={user._id}>
                                    <td className="col-3 col-md-2 hstack gap-1 d-flex justify-content-center">
                                        <button className="btn btn-outline-info" data-action={ACTIONS.Open}
                                            onClick={(e) => handleAction(e, user._id)}><i className="bi bi-eye"></i></button>
                                        <button className="btn btn-outline-warning" data-action={ACTIONS.Edit}
                                            onClick={(e) => handleAction(e, user._id)}><i className="bi bi-pencil-square"></i></button>
                                        <button className="btn btn-outline-danger" data-action={ACTIONS.Delete}
                                            onClick={(e) => handleAction(e, user._id)} disabled={!isMainAdmin || user._id === actualUser._id} ><i className="bi bi-trash"></i></button>
                                        <button className="btn btn-outline-success" data-action={ACTIONS.MakeAdmin}
                                            onClick={(e) => handleAction(e, user._id)} disabled={!isMainAdmin || user._id === actualUser._id} ><i className="bi bi-key"></i></button>
                                    </td>
                                    <td className="col-2">{user.role}</td>
                                    <td className="col">(<small className="fst-italic"> {user.nick} </small>) {user.fullName}</td>
                                    <td className="col-3">{user.email}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>


            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <InfoProfile data={userSelected} onCancel={() => setIsModalOpen(false)} />
            </Modal>

        </>
    )
}
