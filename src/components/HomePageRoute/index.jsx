import { HomePage } from "../HomePage.jsx"
import { ProtectedRoute } from "../ProtectedRoute"


const HomePageRoute = ({certificates, setCertificates, start, setStart,
                        searchInfo, setSearchInfo,
                        allowDeleting, setAllowDeleting,
                        certs2Delete, setCerts2Delete}) => {
    return (
        <ProtectedRoute>
            <HomePage certificates={certificates} setCertificates={setCertificates}
                      start={start} setStart={setStart} 
                      searchInfo={searchInfo} setSearchInfo={setSearchInfo}
                      allowDeleting={allowDeleting} setAllowDeleting={setAllowDeleting}
                      certs2Delete={certs2Delete} setCerts2Delete={setCerts2Delete}/>
        </ProtectedRoute>
    )
}

export {HomePageRoute}