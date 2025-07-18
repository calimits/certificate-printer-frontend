import { useNavigate } from "react-router-dom";
import { DialogueWindow } from "../DialogueWindow";
import "./LogoutPage.css"
import { deleteDataFromLocalStore } from "../../helpers/deleteDataFromLocalStore";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";




const LogoutPage = ({setCertsUser, setStartUser}) => {
    const {setToken, setUser, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClickBtnYes = (e) => {
        setUser({name: "", id: ""});
        setToken("");
        setIsAuth(false)
        deleteDataFromLocalStore();
        setCertsUser([]); //encontrado el bug analizar por que hice etso
        setStartUser(0);
        navigate("/");
    }
    const handleClickBtnNo = (e) => {
        navigate(-1);
    }
    return(
        <main className="logout-container">
            <DialogueWindow question="Are you sure you want to logout?"
                            handleClickBtnNo={handleClickBtnNo}
                            handleClickBtnYes={handleClickBtnYes}/>
        </main>
    )
}

export {LogoutPage};