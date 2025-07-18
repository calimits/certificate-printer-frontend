import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate} from "react-router-dom";


const ProtectedRoute = ({redirectPath, children}) => {
    const {isAuth} = useContext(AuthContext);

    if (!isAuth) return <Navigate to={redirectPath} replace/>;
    return children;     
}

export { ProtectedRoute };