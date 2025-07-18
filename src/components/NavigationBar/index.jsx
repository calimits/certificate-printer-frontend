import "./NavigationBar.css"
import { LinkItem } from '../LinkItem'
import { SearchBar } from '../SearchBar'
import { helphttp } from "../../helpers/helphttp"
import { API } from "../../helpers/API"



const NavigationBar = ({ titleLink, title, links, searchInfo,
                        setSearchInfo, allowDeleting, setAllowDeleting,
                        certs2Delete, setCerts2Delete}) => {
    
    const api = helphttp();
    const handleClick4CancelDeleting = () => {
        setAllowDeleting(false);
        setCerts2Delete([]);
    }

    const handleClick4Deleting = async (e) => {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };
        const body = certs2Delete;
        try {
            const res = await api.del(API.URLs.delUserCerts,{ body, headers});
            setAllowDeleting(false);
            location.reload();
            console.log(res);
        } catch (error) {
            console.log(error);   
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href={titleLink} target="_blank">{title}</a>
                <div>
                    {allowDeleting ? <button className="navbar-toggler no-border" type="button" onClick={handleClick4CancelDeleting}>❌</button> : null}
                    {allowDeleting ? <button className="navbar-toggler no-border" type="button" >{certs2Delete.length}</button> : null}
                    {allowDeleting ? <button className="navbar-toggler no-border" type="button" onClick={handleClick4Deleting}>🗑️</button> : null}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" /*style="--bs-scroll-height: 100px"*/>
                        {links.map((link, index) => (
                            <LinkItem path={link.path} body={link.body} key={index} />
                        ))}
                    </ul>
                    {allowDeleting ? <button className="no-border no-back btn hover-scale" type="button" onClick={handleClick4CancelDeleting}>❌</button> : null}
                    {allowDeleting ? <button className="no-border no-back btn hover-scale" type="button" >{certs2Delete.length}</button> : null}
                    {allowDeleting ? <button className="no-border no-back btn hover-scale" type="button" onClick={handleClick4Deleting}>🗑️</button> : null}
                    <SearchBar body="Search" placeholderText="Search"
                        searchInfo={searchInfo} setSearchInfo={setSearchInfo} />
                </div>
            </div>
        </nav>

    )
}

export { NavigationBar };