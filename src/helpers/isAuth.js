import { API } from "./API";
import { deleteDataFromLocalStore } from "./deleteDataFromLocalStore";
import { helphttp } from "./helphttp";

let api = helphttp();

const isAuthorized = async (user) => {
    try {
        const res = await api.post(API.URLs.checkUser, {
            body: {
                name: user.name,
                id: user.id,
                token: user.token
            }
        });
        return true;
    } catch (error) {
        deleteDataFromLocalStore();
        return false;
    }
} 

export {isAuthorized};