import header from "../../assets/Header.jpg";
import footer from "../../assets/Footer.jpg";
import "./SelectWindow.css";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/configSupabaseClient";


const resources = [header, footer, header, footer, header, footer];

async function getSignedUrls(bucketName, folderPath) {
  
  // 2. Listar archivos en la carpeta
  const { data: files, error: listError } = await supabase
    .storage
    .from(bucketName)
    .list(folderPath)

  if (listError) {
    throw new Error(`Error al listar archivos: ${listError.message}`)
  }

  // 3. Si no hay archivos, retornar array vacío
  if (!files || files.length === 0) {
    return []
  }

  // 4. Filtrar solo archivos (ignorar subcarpetas)
  const validFiles = files.filter(file => file.id !== null)

  // 5. Generar URLs firmadas con expiración de 10 años (en segundos)
  const hundredYearsInSeconds = 100 * 365 * 24 * 60 * 60
  const signedUrls = []

  for (const file of validFiles) {
    const filePath = `${folderPath}/${file.name}`
    
    try {
      const { data: signedUrl, error: urlError } = await supabase
        .storage
        .from(bucketName)
        .createSignedUrl(filePath, hundredYearsInSeconds)

      if (urlError) {
        console.error(`Error al generar URL para ${filePath}:`, urlError.message)
        continue
      }

      signedUrls.push({
        name: file.name,
        url: signedUrl.signedUrl,
        path: filePath,
        expires_at: new Date(Date.now() + (hundredYearsInSeconds * 1000)).toISOString()
      })
    } catch (error) {
      console.error(`Error procesando ${filePath}:`, error.message)
    }
  }

  return signedUrls
}

const SelectWindow = ({ body, setFormData, formData, close }) => {
    const [picturesUrls, setPicturesUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getUrls() {
            let fileUrls = await getSignedUrls("certificate-printer", `${body}s`);
            setPicturesUrls(fileUrls);
        }
        setLoading(true);
        getUrls()
    }, []);

    useEffect(()=>{
        console.log(picturesUrls);
        setLoading(false);
    }, [picturesUrls]);

    const selectPicture = (e) => {
        e.preventDefault();
        const url = e.target.src;
        setFormData({
            ...formData,
            [body]: url
        });
        close();
    }

    return (
        <div className="window-container">
            <div className="window">
                <h4 className="window-item">Select {body}</h4>
                {loading ? <p>Loading ...</p> : (
                    <div className="window-item img-flex">
                        {picturesUrls.map((picture, index) => (
                        <img onClick={selectPicture} className=" img-item" key={index} src={picture.url} alt="one header" />
                        ))}
                    </div>
                )}
                <button onClick={close} className="btn btn-primary window-item">Cancel</button>
            </div>
        </div>
    )

}

export { SelectWindow };