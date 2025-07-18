import { Link, useNavigate } from "react-router-dom";
import { Form } from "../Form.jsx/index.jsx"
import { InputForm } from "../InputForm.jsx/index.jsx"
import "./LoginForm.css";
import { useContext, useState } from "react";
import { helphttp } from "../../helpers/helphttp.js";
import { API } from "../../helpers/API.js";
import { AuthContext } from "../AuthContext/index.jsx";


const LoginForm = () => {
    //Auth Context
    const {setToken, setUser, setIsAuth} = useContext(AuthContext);
    //States
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    let api = helphttp();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`${API.URLs.login}`,{body: formData});
            setToken(res.token);
            setUser({name: res.name, id: res.id});
            setIsAuth(true);
            setLoggedIn(true);
            localStorage.setItem("name", `${res.name}`);
            localStorage.setItem("id", `${res.id}`);
            localStorage.setItem("token", `${res.token}`);
            setTimeout(() => {
                navigate(`/admin`);            
            }, 800);
            } catch (error) {
            console.log(error);
        }
    }

    return(
        <Form handleSubmit={handleSubmit} method="POST" className="form-react">
            <h4 className="title">Login</h4>
            <InputForm handleChange={handleChange} id="name" type="text" placeholder="@username" />
            <InputForm handleChange={handleChange} id="password" type="password" placeholder="Password" />
            {loggedIn ? <p>Log in succesfully</p> : null}
            <Link className="link" to="/sign-in" >Don't you have an account?</Link>
        </Form>
    )
}

export {LoginForm};