import { CertificateForm } from "../CertificateForm/index.jsx"
import { API } from "../../helpers/API.js";
import { helphttp } from "../../helpers/helphttp.js";
import { useState } from "react";


const CertificateFormPage = () => {
    const [opDone, setOpDone] = useState(false);
    const [error, setError] = useState(false);

    const message = "Certificate posted succesfully.";
    let api = helphttp();

    const post1Cert = async (data) => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("name");
        data.username = username;
        const headers = { "Authorization": `Bearer ${token}` };
        const body = data;
        let res = await api.post(API.URLs.postCerts, { headers, body });
        setOpDone(true);
    }

    const handleData = async (data) => {
        try {
            post1Cert(data);
        } catch (error) {
            setError(true);
        }
    }


    return (
        <main>
            <CertificateForm handleData={handleData} opDone={opDone}
                             message={message} error={error} certData={{}} />
        </main>
    )
}

export { CertificateFormPage }