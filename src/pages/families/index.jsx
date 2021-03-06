import FamiliesList from "./families-list"

const list = [
    { id: 1, name: 'Software' },
    { id: 2, name: 'Hardware' },
    { id: 3, name: 'Services' },
    { id: 4, name: 'Others' },
]


export default function Families() {
    return (
        <div className="card-maintenance">
            <div className="card shadow ">
                <div className="card-header text-center">
                    <h3>Families</h3>
                </div>
                <div className="card-body">
                    <FamiliesList data={list}></FamiliesList>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary">New family</button>
                </div>
            </div>
        </div>
    )
}
