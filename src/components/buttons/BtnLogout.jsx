import React from 'react'

export default function BtnLogout(props) {
    return (
        <button
            className="btn btn-success"
            {...props}
        >
            <span className="badge rounded-pill bg-primary px-3 py-2">
                {props.name}
            </span>
            {" - Logout"}
        </button>
    )
}
