import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { Outlet } from "react-router";
import { fetchWithJwt } from '../js/Accounts.js'

function Guides({currentUser}) {

    const [guides, setGuides] = useState([])
    const [guidesDisplay, setGuidesDisplay] = useState([])
    const [query, setQuery] = useState("")

    function initGuides(list) {
        setGuidesDisplay(list);
        setGuides(list);
    }
    
    function searchDyn(needle) {
        setGuidesDisplay(guides.filter(t => {
            return t.firstname.toLowerCase().includes(needle.toLowerCase()) ||
                t.lastname.toLowerCase().includes(needle.toLowerCase())
        }))
    }
    
    function search(event) {
        if (event)
            event.preventDefault();
        setGuidesDisplay(guides.filter(t => {
            return t.firstname.toLowerCase().includes(query.toLowerCase()) ||
                t.lastname.toLowerCase().includes(query.toLowerCase())
        }))
    }

    useEffect(() => {
        fetchWithJwt("http://localhost:9999/api/guides", initGuides);
    }, [])

    return (
        <div className="trips_table">
        <h1>Guides</h1>

        <form onSubmit={search}>
        <label for="query">search: </label>
        <input name="query" type="text" onChange={t => {
            setQuery(t.target.value);
            searchDyn(t.target.value);
        }} />
        </form>

        { guides && (guides.status === undefined ? (
            <table>
            <thead>
            <tr key={crypto.randomUUID()}>
            <th> navn </th>
            <th> email </th>
            <th> telefon </th>
            </tr>
            </thead>
            <tbody>
            { guidesDisplay.length > 0 ? (
                guidesDisplay.map(t => {
                    return (
                        <tr key={crypto.randomUUID()}>

                        <td> <Link to={'/guides/' + t.id}>{t.firstname + ' ' + t.lastname}</Link></td>
                        <td> {t.email} </td>
                        <td> {t.phone} </td>

                        </tr>
                    )
                })) : (
                    <tr key={crypto.randomUUID()}>

                    <td><Link to={'/guides/'}>no guides found</Link></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    </tr>
                )
            }

            </tbody>
            </table>
        ) : ( guides.status === "401" ? (
            <h2>permission denied</h2>
        ) : (
            <h2>unexpected error: {JSON.stringify(guides)}</h2>
        )
        )
        )            
        }

        </div>
    ) 
}

export default Guides



