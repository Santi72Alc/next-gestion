import React from 'react'

export default function BtnFirstUser(props) {
    return (
        <button
            className="btn btn-success"
            {...props}
        >
            <div className="vstack">
                <span>* NO USERS *</span>
                <span>Create MAIN ADMIN</span>
            </div>
        </button>
    )
}
