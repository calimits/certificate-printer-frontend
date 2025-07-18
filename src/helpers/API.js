
const domainName = "localhost:3000";
const URLs = {
        getUser: `http://${domainName}/api-cert-printer/users`,
        getAllUsers: `http://${domainName}/api-cert-printer/users`,
        login: `http://${domainName}/api-cert-printer/login/users`,
        postUser: `http://${domainName}/api-cert-printer/users`,
        putUser: `http://${domainName}/api-cert-printer/users`,
        delUser: `http://${domainName}/api-cert-printer/users`,
        checkUser: `http://${domainName}/api-cert-printer/check`,
        getCert: `http://${domainName}/api-cert-printer/certificates`,
        getAllCerts: `http://${domainName}/api-cert-printer/certificates`,
        searchCerts: `http://${domainName}/api-cert-printer/search/certificates`,
        getUserCerts: `http://${domainName}/api-cert-printer/certificates/users`,
        postCerts: `http://${domainName}/api-cert-printer/certificates`,
        putCert: `http://${domainName}/api-cert-printer/certificates`,
        delCert: `http://${domainName}/api-cert-printer/certificates`,
        delUserCerts: `http://${domainName}/api-cert-printer/delete/certificates`,
        delAllCerts: `http://${domainName}/api-cert-printer/certificates`

}

export const API = {
    domainName,
    URLs
}