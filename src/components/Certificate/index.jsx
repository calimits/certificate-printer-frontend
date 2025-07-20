import { useParams } from "react-router-dom"
import "./Certificate.css"
import { useEffect, useRef, useState } from "react";
import {helphttp} from "../../helpers/helphttp.js"
import {API} from "../../helpers/API.js"
import qrCode from "qrcode"
import jspdf from "jspdf";



//rutas temporales
import header from "../../assets/Header.jpg";
import footer from "../../assets/Footer.jpg";

const addText2PDF = (doc, text, x, y, fontSize) => {
    const lineHeight = fontSize * 0.4;
    let currentY = y;
    const splitText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth());
    doc.setFontSize(fontSize);

    splitText.forEach((text) => {
        doc.text(text, x, currentY, {align: "center"});
        currentY += lineHeight;
    });

    return currentY;

}

const Certificate = () => {
    const [error, setError] = useState(false);
    const [cert, setCert] = useState({
        _id: "",
        names: "",
        role: "",
        description: "",
        type: "",
        typename: "",
        workname: "",
        tome: "",
        folio: "",
        date: "",
        header: "",
        footer: ""
    });
    const [headerLoaded, setHeaderLoaded] = useState(false);
    const [footerLoaded, setFooterLoaded] = useState(false);

    const params = useParams();
    const qrCanvasRef = useRef(null);
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const api = helphttp();
    const domain = "https://calimits.github.io/certificate-printer-frontend";
    //vamos

    const handleDownload = (e) => {
        e.preventDefault();
        //pdf doc creation
        const doc  = new jspdf();
        doc.setFont("helvetica");
        
        //control variables
        let currentY = 20;
        let xCord = 105;
        let marginY = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        //printing header
        const imgWidth = pageWidth - 20;
        const imgHeight = (headerRef.current.height / headerRef.current.width) * imgWidth;
        doc.addImage(headerRef.current, "JPEG", 10, currentY, imgWidth, imgHeight);
        currentY += imgHeight + marginY;

        //printing names
        const namesText =`A ${cert.names}`; 
        currentY = addText2PDF(doc, namesText, xCord, currentY, 20)
        

        //Printing role, type and typename
        if (cert.role) {
            const roleText = `Por su participación como ${cert.role} en el ${cert.type}: ${cert.typename}`;
            currentY = addText2PDF(doc, roleText, xCord, currentY, 16);
        }

        //Printing workName
        if (cert.role) {
            if (cert.role.includes(String.prototype.toLowerCase("ponente")) ||
             cert.role.includes(String.prototype.toLowerCase("autor")) ||
             cert.role.includes(String.prototype.toLowerCase("tutor")) ||
             cert.role.includes(String.prototype.toLowerCase("oponente"))) {
                const workText = cert.workname;
                currentY = addText2PDF(doc, workText, xCord, currentY, 16);
        }
        }

        //printing description
        if (cert.description) {
            const descriptionText = cert.description;
            currentY = addText2PDF(doc, descriptionText, xCord, currentY,16);
        }

        //Printing tome and folio
        if (cert.tome && cert.folio) {
            const tomeText = `Registrado al tomo ${cert.tome}, folio ${cert.folio}`;
            currentY = addText2PDF(doc, tomeText, xCord, currentY, 14);
        }

        //Printing date
        const dateText = `Fecha de emisión: ${cert.date.substring(0,10)}`;
        currentY = addText2PDF(doc, dateText, xCord, currentY, 14);

        //PrintingCanvas 
        doc.addImage(qrCanvasRef.current, "JPEG", 
            (doc.internal.pageSize.getWidth() / 2) - qrCanvasRef.current.width / 8, 
            currentY, qrCanvasRef.current.width / 4, qrCanvasRef.current.height / 4);
        currentY += qrCanvasRef.current.height / 4; 
        
        
        //printing footer
        const imgWidthFoot = pageWidth - 20;
        const imgHeightFoot = (footerRef.current.height / footerRef.current.width) * imgWidthFoot;
        doc.addImage(footerRef.current, "JPEG", 10, currentY, imgWidthFoot, imgHeightFoot);

        //saving PDF
        doc.save("testPDF.pdf");
    }

    const fetchCert = async () => {
            try {
                let certData = await api.get(`${API.URLs.getCert}/${params.id}`);
                setCert(certData);
                setError(false);
            } catch (error) {
                setError(true);
            }
        }
        

    useEffect(()=>{
        fetchCert();
        console.log(cert)
    }, []);

    useEffect(()=>{
            if (cert._id) qrCode.toCanvas(qrCanvasRef.current, `${domain}/#/certificates/${cert._id}`, ()=>{});
    },[cert])

    if (!cert || error) return (
        <main className="center">
            <h6>An error ocurred while fetching the data. Try again.</h6>
            <button onClick={fetchCert} className="btn btn-primary">Reload</button>
        </main>
    )
    if (cert) return(
        <div className="cert">
            <img onLoad={()=>setHeaderLoaded(true)} ref={headerRef} src={cert.header} alt="header"/>
            <h3>A {cert.names}</h3>
            {cert.role ? 
                (<div>
                    <h5>Por su participación como {cert.role} en el {cert.type}: {cert.typename}</h5>
                </div>) : (null)}
            {cert.role ? cert.role.includes(String.prototype.toLowerCase("ponente")) ||
             cert.role.includes(String.prototype.toLowerCase("autor")) ||
             cert.role.includes(String.prototype.toLowerCase("tutor")) ||
             cert.role.includes(String.prototype.toLowerCase("oponente")) ? (
                <h5><i>{cert.workname}</i></h5>
             ) : (null) : null}
            {cert.description ? <h5>{cert.description}</h5> : null}
            {cert.tome && cert.folio ? <h6>Registrado al tomo {cert.tome}, folio {cert.folio}</h6> : null} 
            <h6>Fecha de emisión: {cert.date.substring(0,10)}</h6> 
            <canvas ref={qrCanvasRef}>QR Code</canvas>
            <img onLoad={()=>setFooterLoaded(true)} ref={footerRef} src={cert.footer} alt="footer"/>
            {headerLoaded && footerLoaded ? <button onClick={handleDownload} className=" margin-1rem btn btn-primary">Download</button> : null}
        </div>
    )
}

export {Certificate};