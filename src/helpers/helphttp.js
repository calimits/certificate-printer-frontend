export const helphttp = () => {
    const customFetch = (endpoint, options) => {
        const defaultHeader = {
            "Content-type": "application/json; charset=utf-8"
        }

        const controller = new AbortController();
        options.signal = controller.signal;
        options.method = options.method || "GET";
        options.headers = options.headers ? {...defaultHeader, ...options.headers } : defaultHeader;

        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;

        setTimeout(() => { controller.abort() }, 30000);

        return fetch(endpoint, options)
            .then(res => res.ok ? res.json() : Promise.reject({
                error: true,
                status: res.status || "00",
                statusText: res.statusText || "An error ocurred"
            }))
    }

    const get = (url, options = {}) => customFetch(url, options);

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    } 

    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    } 


    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    }  

    return {
        get,
        post,
        put,
        del
    }
}