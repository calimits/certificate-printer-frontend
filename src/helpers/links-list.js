const linksVisitor = [{path: "/", body: "Home"}, 
                      {path: "/login", body: "Login"},
                      {path: "/sign-in", body: "Sign in"},
                      {path: "/logout", body: "Logout"}];

                      
const linksUser = [{path: "/admin", body: "Home"},
                    {path: "/add-certificate", body: "Add certificate"},
                    {path: "/add-resources", body: "Add resources"}, 
                    {path: "/logout", body: "Logout"}, 
                    ];

export default {
    linksUser, 
    linksVisitor
};