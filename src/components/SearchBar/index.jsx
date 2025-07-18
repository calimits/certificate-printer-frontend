import { useContext, useEffect, useState } from "react";
import { helphttp } from "../../helpers/helphttp";
import { API } from "../../helpers/API";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const SearchBar = ({body, placeholderText, searchInfo, setSearchInfo}) => {
    const [loading, setLoading] = useState(false);
    const {isAuth} = useContext(AuthContext);

    const navigate = useNavigate();

    const limit = 20;
    const api = helphttp();
    
    
    const getSearchedData = async () => {
        setSearchInfo({...searchInfo, hasSearched: true});
        setLoading(true);
        const user = localStorage.getItem("name");
        const route = isAuth ? `${API.URLs.searchCerts}/${user}?search=${searchInfo.search}&start=${searchInfo.start}&limit=${limit}` 
                             : `${API.URLs.searchCerts}?search=${searchInfo.search}&start=${searchInfo.start}&limit=${limit}`;
        try {
            let data = await api.get(route);
            setSearchInfo(searchInfo => { return {...searchInfo, 
                    start: searchInfo.start + data.length,
                    results: [...searchInfo.results, ...data],
                    error: false}
        });
        } catch (error) {
            setSearchInfo({...searchInfo, error: true});
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setSearchInfo({...searchInfo, search: e.target.value});
    }

    const handleFocus = (e) => {
        setSearchInfo({...searchInfo, 
            hasSearched: false,
            results: [],
            start: 0});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        getSearchedData();
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} onFocus={handleFocus} className="d-flex" role="search">
            <input className="form-control me-2" type="search" id="search" 
                    placeholder={placeholderText} aria-label="Search" 
                    onChange={handleChange}
                    disabled={loading}/>
            <button className="btn btn-outline-success" type="submit">{body}</button>
        </form>
    )
}

export {SearchBar};