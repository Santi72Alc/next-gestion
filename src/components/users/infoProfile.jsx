import { initialUserProfile } from '@Services/constants'

export default function InfoProfile({ data = { ...initialUserProfile }, onCancel }) {
    const user = data

    return (
        <div className="card">
            <div className="card-header text-center">
                <h3>Profile</h3>
                <h5 className="fst-italic">· {user?.role} ·</h5>
            </div>
            <div className="card-body">
                {/* <form> */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"
                        className="form-control"
                        value={user.email}
                        disabled
                    />
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="fullName">Full name</label>
                            <input type="text" id="fullName"
                                value={user.fullName}
                                className="form-control"
                                placeholder="Type your name"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="nick">Nick</label>
                            <input type="text" id="nick"
                                value={user.nick}
                                className="form-control"
                                placeholder="Type your nick"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* </form> */}
            </div >
            <div className="card-footer p-4">
                <div className="hstack gap-3 d-flex justify-content-center">

                    <button onClick={onCancel} className="btn btn-outline-secondary">Cancel</button>
                </div>
            </div>
        </div >
    )
}
