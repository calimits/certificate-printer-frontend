import { useState } from "react";
import { Form } from "../Form.jsx/index.jsx";
import { InputForm } from "../InputForm.jsx/index.jsx";
import "./SignInForm.css";
import { helphttp } from "../../helpers/helphttp.js";
import { API } from "../../helpers/API.js";
import { useNavigate } from "react-router-dom";
import vd from "../../helpers/Validators.js"
import { ValidatorFormFactory } from "../../helpers/ValidatorFactory.js";




const SignInForm = () => {
    //States
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        key: ""
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    })
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [invalidKey, setInvalidKey] = useState(false);
    //end states

    const navigate = useNavigate();
    let api = helphttp(); 

    //Event handlers
    const handleChange = (e) => {
        const validator = new ValidatorFormFactory().createValidator(e.target.id);

        setErrors({
            ...errors,
            [e.target.id]: vd.validateData(validator, e.target.value)
        })
        
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleBlur = async (e) => {
        try {
            let name = await api.get(`${API.URLs.getUser}/${formData.name}`);
            if (name) setIsRepeat(true);
        } catch (error) {
            if (error.status === 404) setIsRepeat(false);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`${API.URLs.postUser}`, {body: formData});
            setIsSignedIn(true);
            setTimeout(() => {
                navigate("/login");
            }, 800);
        } catch (error) {
            setInvalidKey(true);
        }
        
    }
    //end event handlers

    return(
        <Form handleSubmit={handleSubmit} method="POST" className="form-react">
            <h4 className="tirle">Sign in</h4>
            <InputForm required={true} handleBlur={handleBlur} handleChange={handleChange} id="name" type="text" placeholder="@username" />
            {isRepeat? <p className="color-gray">User name already taken</p> : null}
            {!errors.name? <p className="color-gray">User name must only have letters, numbers and _.</p> : null}
            <InputForm required={true} handleChange={handleChange} id="email" type="email" placeholder="Email" />
            {!errors.email? <p className="color-gray">Invalid email</p> : null}
            <InputForm required={true} handleChange={handleChange} id="password" type="password" placeholder="Password" />
            {!errors.password? <p className="color-gray">Password must have at least 1 upper letter,
                 1 lower letter, 1 number, one special character (/?@$!%*?&) and at least
                 8 characters total.  </p> : null}
            <InputForm required={true} handleChange={handleChange} id="key" type="password" placeholder="Permission Key" />
            {invalidKey ? <p className="color-gray">Invalid key provided</p> : null}
            {isSignedIn ? <p>User created succesfully</p> : null}
        </Form>
    )
}

export {SignInForm};