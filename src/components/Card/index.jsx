import "./Card.css";

const Card = ({header, title, body}) => {
    return (
        <div className="card text-bg-primary mb-3 hover-transform-scale link-card">
            <div className="card-header">{header}</div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
            </div>
        </div>
    )
}

export {Card};