import exceljs from "exceljs";
import { useState } from "react";
import { Form } from "../Form.jsx";
import { InputForm } from "../InputForm.jsx";
import { useModal } from "../../helpers/useModal.js";
import { SelectWindow } from "../SelectWindow/index.jsx";



const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        }

        reader.onerror = (error) => {
            reject(error);
        }

        reader.readAsArrayBuffer(file);
    });
}

const processExcel = async (data) => {
    const workbook = new exceljs.Workbook();
    const username = localStorage.getItem("name");
    let fieldsMap = new Map();
    let cert = {};
    let certs = [];
    await workbook.xlsx.load(data);
    const fstSheet = workbook.getWorksheet(1);
    fstSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            rowNumber === 1 ? fieldsMap.set(colNumber, cell.value) : cert = { ...cert, [fieldsMap.get(colNumber)]: cell.value };
        })
        rowNumber != 1 ? cert.username = username : null;
        rowNumber != 1 ? certs.push(cert) : null;
        cert = {};
    })

    return certs;
}


const CertUploader = ({handleData, opDone, message, error}) => {
    const [formData, setFormData] = useState({});
    const [isHandlingFile, setIsHandlingFile] = useState(false);
    const [certs, setCerts] = useState([]);
    const [isParsed, setIsParsed] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false);

    const modal1 = useModal();
    const modal2 = useModal();
    
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

    const handleChangeFile = async (e) => {
        setIsHandlingFile(true);
        const file = e.target.files[0];
        try {
            const data = await readFileAsync(file);
            let certarray = await processExcel(data);
            setIsParsed(true);
            setCerts(certarray);
            console.log(certarray) //
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (certs.length > 0 && formData.header && formData.footer) {
            let auxCerts = certs;
            auxCerts.forEach(cert => {
                cert.header = formData.header;
                cert.footer = formData.footer;
            })
            setIsProcessed(true);
            setFormData(auxCerts);
            console.log(auxCerts); //
        }
    }

    const classes = { div: "", input: "cert-input" };

    return (
        <Form method="POST" handleSubmit={handleSubmit} className="cert">
            <InputForm required handleChange={handleChangeFile} type="file" id="file" />
            {isParsed ? <p>Excel data parsed succesfully.</p> : null}
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
                {isHandlingFile ? (
                    <div className="input-group mb-3 margin-04rem">
                        <button onClick={handleClick} className="btn btn-primary form-control">Process table</button>
                    </div>) : null}
            </div>
            {isProcessed ? <p>Table data processed succesfully. You can submit now.</p> : null}
            {opDone ? <p>{message}</p> : null}
            {error ? <p>Operation failed. Try again.</p> : null}
            {modal1.isOpen ? <SelectWindow formData={formData} setFormData={setFormData} body="header" close={modal1.close}/> : null}
            {modal2.isOpen ? <SelectWindow formData={formData} setFormData={setFormData} body="footer" close={modal2.close}/> : null}
        </Form>
    )
}

export { CertUploader }