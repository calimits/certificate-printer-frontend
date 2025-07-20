
//https://certificate-printer-server.onrender.com
//http://localhost:3000
const urlAndDomainName = "http://localhost:3000";
const URLs = {
        getUser: `${urlAndDomainName}/api-cert-printer/users`,
        getAllUsers: `${urlAndDomainName}/api-cert-printer/users`,
        login: `${urlAndDomainName}/api-cert-printer/login/users`,
        postUser: `${urlAndDomainName}/api-cert-printer/users`,
        putUser: `${urlAndDomainName}/api-cert-printer/users`,
        delUser: `${urlAndDomainName}/api-cert-printer/users`,
        checkUser: `${urlAndDomainName}/api-cert-printer/check`,
        getCert: `${urlAndDomainName}/api-cert-printer/certificates`,
        getAllCerts: `${urlAndDomainName}/api-cert-printer/certificates`,
        searchCerts: `${urlAndDomainName}/api-cert-printer/search/certificates`,
        getUserCerts: `${urlAndDomainName}/api-cert-printer/certificates/users`,
        postCerts: `${urlAndDomainName}/api-cert-printer/certificates`,
        putCert: `${urlAndDomainName}/api-cert-printer/certificates`,
        delCert: `${urlAndDomainName}/api-cert-printer/certificates`,
        delUserCerts: `${urlAndDomainName}/api-cert-printer/delete/certificates`,
        delAllCerts: `${urlAndDomainName}/api-cert-printer/certificates`

}

export const API = {
    urlAndDomainName,
    URLs
}