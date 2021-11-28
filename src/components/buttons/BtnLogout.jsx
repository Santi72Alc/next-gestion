import React from 'react'

export default function BtnLogout(props) {
    return (
        <button
            className="btn btn-success"
            {...props}>
            <div className="hstack gap-2 p-1">
                <span className="badge rounded-pill bg-primary px-2 py-2 ">
                    {props.name}
                </span>
                <span>Logout</span>
            </div>
        </button>
    )
}
