import { Link } from "react-router-dom"

const LinkItem = ({path, body}) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" aria-current="page" to={path}>{body}</Link>
        </li>
    )
}

export { LinkItem }