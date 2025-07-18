
const getDataFromLocalStore = () => {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    return {name, id, token};
}

export {getDataFromLocalStore};