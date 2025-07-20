import { Form } from "../Form.jsx/index.jsx"
import { InputForm } from "../InputForm.jsx"
import "./CertificateForm.css"
import { useEffect, useState } from "react"
import { useModal } from "../../helpers/useModal.js"
import { SelectWindow } from "../SelectWindow/index.jsx"


const CertificateForm = ({ handleData, opDone, message, error, certData }) => {
    const [formData, setFormData] = useState({});
    const modal1 = useModal();
    const modal2 = useModal();

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('fr-CA', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleData(formData);
    }
    
    useEffect(()=>{
        if (certData) setFormData(certData);
    },[certData])

    const classes = { div: "", input: "cert-input" };
    return (
        <Form method="POST" handleSubmit={handleSubmit} className="cert">
            <h3>A <InputForm handleChange={handleChange} type="text" id="names" placeholder="names" className={classes}
                             required defaultValue={certData.names ? certData.names : ""} /></h3>
            <textarea name="description" id="description" placeholder="description" className="cert-input"
                      defaultValue={certData.description ? certData.description : ""}
                      onChange={handleChange}></textarea>
            <div>
                <h5>Por su participación como
                    <InputForm handleChange={handleChange} id="role" type="text" placeholder="role" className={classes} 
                               required defaultValue={certData.role ? certData.role : ""}/> en
                    <InputForm handleChange={handleChange} type="text" id="type" placeholder="type" className={classes}
                               required defaultValue={certData.type ? certData.type : ""}/>
                    <InputForm handleChange={handleChange} type="text" id="typename" placeholder="typename" className={classes}
                               defaultValue={certData.typename ? certData.typename : ""}/>
                </h5>
            </div>
            <h5><i><InputForm handleChange={handleChange} type="text" id="workname" placeholder="workname" className={classes}
                              defaultValue={certData.workname ? certData.workname : ""}/></i></h5>
            <h6>Registrado al tomo
                <InputForm handleChange={handleChange} type="text" id="tome" placeholder="tome" className={classes}
                           defaultValue={certData.tome ? certData.tome : ""}/> Folio
                <InputForm handleChange={handleChange} type="text" id="folio" placeholder="folio" className={classes}
                           defaultValue={certData.folio ? certData.folio : ""} />
            </h6>
            <h6>Fecha de emisión: <InputForm handleChange={handleChange} type="date" id="date" placeholder="date" className={classes} required
                                             defaultValue={certData.date ? formatDate(new Date(certData.date)) : ""}/></h6>
             <div className="input-group-container">
                <div className="input-group mb-3 margin-04rem">
                    <button onClick={modal1.open} className="btn btn-primary"  type="button" id="button-addon1">Select</button>
                    <input onChange={handleChange} value={formData.header ? formData.header : ""} type="text" className="form-control" placeholder="header-url" id="header" aria-label="Example text with button addon" 
                           aria-describedby="button-addon1" />
                </div>
                <div className="input-group mb-3 margin-04rem">
                    <button onClick={modal2.open} className="btn btn-primary" type="button"  id="button-addon1">Select</button>
                    <input onChange={handleChange} value={formData.footer ? formData.footer : ""} type="text" className="form-control" placeholder="footer-url" id="footer" aria-label="Example text with button addon" 
                           aria-describedby="button-addon1"/>
                </div>
           </div>
            {opDone ? <p>{message}</p> : null}
            {error ? <p>Operation failed. Try again.</p> : null}
            {modal1.isOpen ? <SelectWindow formData={formData} setFormData={setFormData} body="header" close={modal1.close}/> : null}
            {modal2.isOpen ? <SelectWindow formData={formData} setFormData={setFormData} body="footer" close={modal2.close}/> : null}
        </Form>
    )
}

export { CertificateForm };