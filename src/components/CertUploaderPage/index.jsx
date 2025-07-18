import { API } from "../../helpers/API.js";
import { helphttp } from "../../helpers/helphttp.js";
import { useState } from "react";
import { CertUploader } from "../CertUploader/index.jsx";



const CertUploaderPage = () => {
    const [opDone, setOpDone] = useState(false);
    const [error, setError] = useState(false);

    const message = "Certificates posted succesfully.";
    let api = helphttp();

    const postCerts = async (data) => {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };
        const body = data;
        let res = await api.post(API.URLs.postCerts, { headers, body });
        setOpDone(true);
    }

    const handleData = async (data) => {
        try {
            postCerts(data);
        } catch (error) {
            setError(false);
        }
    }


    return (
        <main>
            <CertUploader handleData={handleData} opDone={opDone}
                             message={message} error={error} />
        </main>
    )
}

export { CertUploaderPage }