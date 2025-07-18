import { useState } from "react";
import "./ResourceUploader.css";
import { supabase } from "../../helpers/configSupabaseClient";
import { useNavigate } from "react-router-dom";


async function uploadFile(file, folder) {
    const fileName = `${folder}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
        .from('certificate-printer') 
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading file:', error);
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('certificate-printer')
        .getPublicUrl(fileName);

    return publicUrl;
}

const ResourceUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [destinationFolder, setDestinationFolder] = useState('headers');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFiles([...e.target.files]);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);

        try {
            const uploadPromises = selectedFiles.map(file =>
                uploadFile(file, destinationFolder)
            );

            const urls = await Promise.all(uploadPromises);
            setUploaded(true);
            setTimeout(() => {
                navigate("/admin");
            }, 1000);
        } catch (error) {
            console.error('Error al subir archivos:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container-uploader">
            <h3>Upload resources </h3>

            <div className="uploader-item">
                <label>Select Destiny Folder:  </label>
                <select className="btn btn-primary"
                    value={destinationFolder}
                    onChange={(e) => setDestinationFolder(e.target.value)}
                >
                    <option value="headers">Headers</option>
                    <option value="footers">Footers</option>
                </select>
            </div>

            <div className="uploader-item">
                <input className="input-form mb-3 form-control"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            <button className="btn btn-primary uploader-item"
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
            >
                {uploading ? 'Uploading...' : 'Upload Files'}
            </button>

            {selectedFiles.length > 0 && (
                <div className="uploader-item">
                    <p>Archivos seleccionados:</p>
                    <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {uploaded ? <p>Resources uploaded succesfully.</p> : null}
        </div>
    );
}

export { ResourceUploader };