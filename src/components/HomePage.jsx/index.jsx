import { useContext, useEffect, useRef, useState } from "react";
import { helphttp } from "../../helpers/helphttp"
import { CertificatePreview } from "../CertificatePreview"
import "./HomePage.css"
import { API } from "../../helpers/API";
import { AuthContext } from "../AuthContext";


const HomePage = ({ certificates, setCertificates, start, 
                    setStart, searchInfo, setSearchInfo,
                    allowDeleting, setAllowDeleting,
                    certs2Delete, setCerts2Delete}) => {

    const [loading, setLoading] = useState(true);
    const [errorFetch, setErrorFetch] = useState(false);
    const [hasMoreCert, setHasMoreCerts] = useState(true);
    const [hasMoreSearch, setHasMoreSearch] = useState(true);
    const { isAuth } = useContext(AuthContext);

    const startRef = useRef(start);
    const loadingRef = useRef(loading);
    const hasSearchedRef = useRef(searchInfo.hasSearched);

    const limit = 20;
    let api = helphttp();
    
    const handleClick4ReloadSearch = async (e) => {
        e.preventDefault();
        if (!hasMoreSearch) return;
        setSearchInfo({...searchInfo, hasSearched: true});
        const user = localStorage.getItem("name");
        const route = isAuth ? `${API.URLs.searchCerts}/${user}?search=${searchInfo.search}&start=${searchInfo.start}&limit=${limit}` 
                             : `${API.URLs.searchCerts}?search=${searchInfo.search}&start=${searchInfo.start}&limit=${limit}`;
        try {
            const data = await api.get(route);
            if (data.length === 0) setHasMoreSearch(false);
            setSearchInfo(searchInfo => { return {...searchInfo, 
                    start: searchInfo.start + data.length,
                    results: [...searchInfo.results, ...data],
                    error: false}})
        } catch (error) {
            setSearchInfo({...searchInfo, error: true});
        }
    }

    const getCertificates = async () => {
        if (!hasMoreCert) return;
        const user = localStorage.getItem("name");
        const route = isAuth ? `${API.URLs.getUserCerts}/${user}?start=${startRef.current}&limit=${limit}` : `${API.URLs.getAllCerts}?start=${startRef.current}&limit=${limit}`
        setLoading(true);
        setErrorFetch(false);
        try {
            let res = await api.get(route);
            if (res.length === 0) setHasMoreCerts(false);
            setCertificates(prevCerts => [...prevCerts, ...res]);
            setStart(prevStart => prevStart + res.length);
            setLoading(false);
        } catch (error) {
            setErrorFetch(true);
            setLoading(false);
        }
    }

    const infiniteScroll = (e) => {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (documentHeight - (scrollTop + windowHeight) < 1) {
            if (!loadingRef.current && !hasSearchedRef.current) getCertificates();
        }
    }

    useEffect(()=>{
        startRef.current = start;
        loadingRef.current = loading;
        hasSearchedRef.current = searchInfo.hasSearched;
    },[start, loading, searchInfo])

    useEffect(() => {
        window.scrollTo(0,0);
        if (certificates.length === 0) getCertificates();
        if (certificates.length > 0) setLoading(false);
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener("scroll", infiniteScroll);
        }
    }, []);


    return (
        <>
            {searchInfo.hasSearched && searchInfo.results.length > 0 ? (
                <main className="container">
                    {searchInfo.results.map((cert, index) => (
                        <CertificatePreview key={index} cert={cert} to={`/certificates/${cert._id}`} 
                                            allowDeleting={allowDeleting} setAllowDeleting={setAllowDeleting}
                                            certs2Delete={certs2Delete} setCerts2Delete={setCerts2Delete}/>
                    ))}
                    <div className="center">
                        {hasMoreSearch ? <button onClick={handleClick4ReloadSearch} className="btn btn-primary">Get More Results</button> 
                                       : <h6>There are no results for your search.</h6>}
                    </div>
                </main>
            ) : null }
            {searchInfo.results.length === 0 && searchInfo.hasSearched ? 
                (<div className="center">
                    <h6>There are no more results for your search.</h6>
                </div>) : null}
            {certificates.length > 0 && !searchInfo.hasSearched ? (
                <main className="container">
                    {certificates.map((cert, index) => (
                        <CertificatePreview key={index} cert={cert} to={`/certificates/${cert._id}`} 
                                            allowDeleting={allowDeleting} setAllowDeleting={setAllowDeleting}
                                            certs2Delete={certs2Delete} setCerts2Delete={setCerts2Delete}/>
                    ))}
                </main>
            ) : null}
            <div className="center">
                {loading ? <h5>Loading . . .</h5> : null}
                {errorFetch ? <button className="btn btn-primary" onClick={getCertificates}>Reload Certificates</button> : null}
            </div>
        </>
    )
}

export { HomePage };