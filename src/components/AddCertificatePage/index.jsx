import { Link } from "react-router-dom";
import { Card } from "../Card";
import "./AddCertificatePage.css"


const AddCertificatePage = () => {
    return (
        <main className="page-body">
            <h4 className="title-h4">Select how would you prefer to add certificates.</h4>
            <Link to="/add-certificate/form">
                <Card header="Select for adding one certificate"
                      title="Add only one certificate"
                      body="Click here to fill the add-certificate form"/>
            </Link>
            <Link to="/add-certificate/file">
                <Card header="Select for adding many certificates"
                      title="Add many certificates"
                      body="Click here to add as many certificates as you want"/>
            </Link>
        </main>
    )
}

export {AddCertificatePage}