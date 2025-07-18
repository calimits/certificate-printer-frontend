import { createContext, useState } from "react";
import { helphttp } from "../../helpers/helphttp.js";
import { API } from "../../helpers/API.js";
import { deleteDataFromLocalStore } from "../../helpers/deleteDataFromLocalStore.js";

//hahahajsjsjajsdja
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(
        {
            name: localStorage.getItem("name") || "",
            id: localStorage.getItem("id") || ""
        });

    const checkAuth = async (user) => {
    let api = helphttp();
    try {
        const res = await api.post(API.URLs.checkUser, {
            body: {
                name: user.name,
                id: user.id,
                token: user.token
            }
        });
        setIsAuth(true);
    } catch (error) {
        deleteDataFromLocalStore();
        setIsAuth(false);
    }
}

    const data = {
        isAuth,
        setIsAuth,
        token,
        setToken,
        user,
        setUser,
        checkAuth
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };