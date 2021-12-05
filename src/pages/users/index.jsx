
import { useContext, useEffect, useState } from "react"
import Link from 'next/link'

import UsersContext from "src/context/users.context"
import ActualUserContext from "@Context/actualUser.context"

import styles from './users.module.css'

export default function index() {
    const { isMainAdmin } = useContext(ActualUserContext)
    const { users, getUserById, setFilterToUsers } = useContext(UsersContext)
    const [localUsers, setLocalUsers] = useState(users)
    const [txtFilter, setTxtFilter] = useState("")

    useEffect(() => {
        setLocalUsers(users)
    }, [users])


    function configTable() {
        const usersTable = document.getElementById('usersTable')
        usersTable.DataTable({
            data: localUsers
        })
    }

    function handleAction(id = "") {
        console.log("User: ", getUserById(id))
    }

    function handleSearch(e) {
        const filter = e.target.value
        setTxtFilter(filter)
        if (!filter) setLocalUsers(users)
        else setLocalUsers(setFilterToUsers({ localUsers, filter }))
    }

    return (
        <>
            <div className="container-fluid">

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
                            {localUsers.map((user) =>
                                <tr className="row d-flex align-items-center" key={user._id}>
                                    <td className="col-3 col-md-2 hstack gap-1 d-flex justify-content-center">
                                        <button className="btn btn-outline-info" onClick={() => handleAction(user._id)}><i className="bi bi-eye"></i></button>
                                        <button className="btn btn-outline-warning" ><i className="bi bi-pencil-square"></i></button>
                                        <button className="btn btn-outline-danger" disabled={!isMainAdmin} ><i className="bi bi-trash"></i></button>
                                        <button className="btn btn-outline-success" disabled={!isMainAdmin} ><i className="bi bi-key"></i></button>
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
        </>
    )
}
