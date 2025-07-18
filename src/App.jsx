import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import { HomePage } from './components/HomePage.jsx'
import { SignInPage } from './components/SignInPage/index.jsx'
import { LoginPage } from './components/LoginPage/index.jsx'
import { LogoutPage } from './components/LogoutPage/index.jsx'
import { useContext, useEffect, useState } from 'react'
import links from "./helpers/links-list.js"
import { ProtectedRoute } from './components/ProtectedRoute/index.jsx'
import { AuthContext } from './components/AuthContext/index.jsx'
import { Certificate } from './components/Certificate/index.jsx'
import { AddCertificatePage } from './components/AddCertificatePage/index.jsx'
import { CertificateFormPage } from './components/CertificateFormPage/index.jsx'
import { CertUploaderPage } from './components/CertUploaderPage/index.jsx'
import { HomePageRoute } from './components/HomePageRoute/index.jsx'
import { EditCertPage } from './components/EditCertPage/index.jsx'
import { UploadResourcePage } from './components/UploadResourcePage/index.jsx'


function App() {
  //search
  const [searchInfo, setSearchInfo] = useState({
    search: "",
    results: [],
    hasSearched: false,
    error: false,
    start: 0
  })

  const {isAuth, checkAuth, user, token} = useContext(AuthContext);

  //delete certs
  const [allowDeleting, setAllowDeleting] = useState(false); 
  const [certs2Delete, setCerts2Delete] = useState([]);

  //visitors
  const [certificates, setCertificates] = useState([]);
  const [start, setStart] = useState(0);

  //admin
  const [certsUser, setCertsUser] = useState([]);
  const [startUser, setStartUser] = useState(0);

    useEffect((() => {
        async function initializeAuth() {
            checkAuth({ token, ...user });
        }
        initializeAuth();
    }), []);


  return (
    <>
      <HashRouter>
          <NavigationBar linkTo="http://www.github.com"
            title="Certificate Printer"
            links={!isAuth ? links.linksVisitor : links.linksUser}
            searchInfo={searchInfo} setSearchInfo={setSearchInfo}
            allowDeleting={allowDeleting} setAllowDeleting={setAllowDeleting}
            certs2Delete={certs2Delete} setCerts2Delete={setCerts2Delete}/>
          <Routes>
            <Route path="/" element={!isAuth ? <HomePage certificates={certificates} setCertificates={setCertificates}
                                                          start={start} setStart={setStart} 
                                                          searchInfo={searchInfo} setSearchInfo={setSearchInfo}
                                                          allowDeleting={allowDeleting} setAllowDeleting={setAllowDeleting}
                                                          setCerts2Delete={setCerts2Delete} certs2Delete={certs2Delete}/> : <Navigate to="/admin"/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/logout" element={<LogoutPage setCertsUser={setCertsUser} setStartUser={setStartUser} />} />
            <Route path="/admin" element={<HomePageRoute certificates={certsUser} setCertificates={setCertsUser}
                                                        start={startUser} setStart={setStartUser} 
                                                        searchInfo={searchInfo} setSearchInfo={setSearchInfo}
                                                        allowDeleting={allowDeleting} setAllowDeleting={setAllowDeleting}
                                                        setCerts2Delete={setCerts2Delete} certs2Delete={certs2Delete}/>}/> {/*rout protected implicitely*/ }
            <Route path="/certificates/:id" element={<Certificate/>} />
            <Route path="/add-certificate" element={<ProtectedRoute redirectPath={"/"}><AddCertificatePage/></ProtectedRoute>}/>
            <Route path="/add-resources" element={<ProtectedRoute redirectPath={"/"}><UploadResourcePage/></ProtectedRoute>}/>
            <Route path="/add-certificate/form" element={<ProtectedRoute redirectPath={"/"}><CertificateFormPage/></ProtectedRoute>}/>
            <Route path="/edit-certificate/:id" element={<ProtectedRoute redirectPath={"/"}><EditCertPage allCerts={[searchInfo.results, certificates, certsUser]}
                                                                                                          setAllCerts={[setSearchInfo, setCertificates, setCertsUser]}/></ProtectedRoute>}/>
            <Route path="/add-certificate/file" element={<ProtectedRoute redirectPath={"/"}><CertUploaderPage/></ProtectedRoute>}/>
          </Routes>
      </HashRouter>

    </>
  )
}

export default App
