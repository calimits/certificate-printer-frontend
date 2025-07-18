import { Link, useNavigate } from "react-router-dom";
import "./CertificatePreview.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";


const CertificatePreview = ({ cert, to, allowDeleting, setAllowDeleting,
                              certs2Delete, setCerts2Delete}) => {
    const [isChecked, setIsChecked] = useState(false);   
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();


    let timer;
    
    useEffect(()=>{
        setIsChecked(false);
    },[allowDeleting]);
    
    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setCerts2Delete(prevCerts => [...prevCerts, cert._id]);
        }
        if (!e.target.checked) {
            let auxCerts = certs2Delete;
            let newCerts = auxCerts.filter(item => item !== cert._id);
            setCerts2Delete([...newCerts]);
        }
    }

    const startDeleteUse = (e) => {
        timer = setTimeout(() => {
            setAllowDeleting(true);
        }, 800);
    }

    const allowDeleteUse = (e) => {
        clearTimeout(timer);
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/edit-certificate/${cert._id}`);
    }

    const handleClick4Navigate2Cert = (e) => {
        e.preventDefault();
        navigate(`/certificates/${cert._id}`);
    }

    useEffect(()=>{
        return ()=> setAllowDeleting(false);
    }, [])

    return (
            <div onMouseDown={isAuth ? startDeleteUse : null} onMouseUp={isAuth ? allowDeleteUse : null} 
                 className="card text-center certificate"  
                 onClick={allowDeleting ? (e)=>{} : handleClick4Navigate2Cert}>
                <div className="card-header">
                    {isAuth && allowDeleting ? <input className="check form-check-input" type="checkbox" checked={isChecked} onChange={handleCheck} /> : null}
                    {cert.names}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{cert.type}</h5>
                    <p className="card-text">{cert.role}</p>
                    {isAuth ? <button onClick={handleClick} to="/edit-certificate" className="btn btn-primary">Edit</button> : null}
                </div>
                <div className="card-footer text-body-secondary">
                    {cert.date}
                </div>
            </div>
    )
}

export { CertificatePreview };
