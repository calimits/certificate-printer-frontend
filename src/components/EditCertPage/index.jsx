import { useEffect, useState } from "react";
import { helphttp } from "../../helpers/helphttp";
import { CertificateForm } from "../CertificateForm";
import { useParams } from "react-router-dom";
import { API } from "../../helpers/API";


const EditCertPage = ({ allCerts, setAllCerts }) => {
    const [opDone, setOpDone] = useState(false);
    const [error, setError] = useState(false);
    const [certData, setCertData] = useState({});
    const params = useParams();
    const message = "Certificate updated succesfully.";
    let api = helphttp();

    useEffect(() => {
        setCertData(getCertByID(allCerts, params.id));
    }, []);

    const getCertByID = (allCerts, id) => {
        let certFounded;
        allCerts.forEach(certGroup => {
            if (certGroup.length > 0) certGroup.forEach(cert => {
                if (cert._id === id) certFounded = cert;
            })
        })
        return certFounded;
    }

    const updateCachedCert = (allCerts, setAllCerts, id, data) => {
        let cert2replace = {};
        let auxCertGroup;
        allCerts.forEach((certGroup, i) => {
            if (certGroup.length > 0) certGroup.forEach((cert, j) => {
                if (cert._id === id) {
                    auxCertGroup = [...certGroup];
                    cert2replace = {...cert, ...data};
                    auxCertGroup[j] = cert2replace;
                    setAllCerts[i](auxCertGroup);
                }
            })
        })
    }

    const putCertificate = async (data) => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("name");
        data.username = username;
        const headers = { "Authorization": `Bearer ${token}` };
        const body = data;
        let res = await api.put(`${API.URLs.putCert}/${params.id}`, { headers, body });
        updateCachedCert(allCerts, setAllCerts, params.id, data)
        setOpDone(true);
    }

    const handleData = async (data) => {
        try {
            putCertificate(data)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    return (
        <main>
            <CertificateForm handleData={handleData} opDone={opDone}
                message={message} error={error}
                certData={certData} />
        </main>
    )
}

export { EditCertPage }