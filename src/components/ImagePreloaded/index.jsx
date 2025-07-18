import { useEffect, useState } from 'react';

function ImagePreloaded({src, alt}) {
    const [imagenCargada, setImagenCargada] = useState(false);
    const [urlImagen, setUrlImagen] = useState('');

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImagenCargada(true);
            setUrlImagen(img.src);
        };
    }, []);

    return (
        <div>
            {imagenCargada ? (
                <img src={urlImagen} alt={alt} />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
}

export {ImagePreloaded};

