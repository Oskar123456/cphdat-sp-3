import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { Outlet } from "react-router";
import { fetchWithJwt } from '../js/Accounts.js'

function Trips({currentUser}) {

    const [trips, setTrips] = useState([])
    const [tripsDisplay, setTripsDisplay] = useState([])
    const [query, setQuery] = useState("")

    function initTrips(list) {
        setTripsDisplay(list);
        setTrips(list);
    }
    
    function searchDyn(needle) {
        setTripsDisplay(trips.filter(t => {
            return t.name.toLowerCase().includes(needle.toLowerCase()) ||
                t.startposition.toLowerCase().includes(needle.toLowerCase())
        }))
    }

    function search(event) {
        if (event)
            event.preventDefault();
        setTripsDisplay(trips.filter(t => {
            return t.name.toLowerCase().includes(query.toLowerCase()) ||
                t.startposition.toLowerCase().includes(query.toLowerCase())
        }))
    }

    useEffect(() => {
        console.log('Trips');
        fetchWithJwt("http://157.245.73.150:9999/api/trips", initTrips);
    }, [])

    return (
        <div className="trips_table">
        <h1>Trips</h1>

        <form onSubmit={search}>
        <label for="query">search: </label>
        <input name="query" type="text" onChange={t => {
            setQuery(t.target.value);
            searchDyn(t.target.value);
        }} />
        </form>
        
        <table>
        <thead>
        <tr key={crypto.randomUUID()}>
        <th> navn </th>
        <th> destination </th>
        <th> guide </th>
        <th> dato </th>
        </tr>
        </thead>
        <tbody>
        { tripsDisplay.length > 0 ? (
            tripsDisplay.map(t => {
                return (
                    <tr key={crypto.randomUUID()}>
                    
                    <td> <Link to={'/trips/' + t.id}>{t.name}</Link></td>
                    <td> {t.startposition} </td>
                    <td> {t.guide.firstname + ' ' + t.guide.lastname} </td>
                    <td> {t.starttime} </td>
                    
                    </tr>
                )
            })) : (
                    <tr key={crypto.randomUUID()}>
                    
                    <td><Link to={'/trips/'}>no trips found</Link></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                    </tr>
            )
        }
        
        </tbody>
        </table>
        </div>
    ) 
}

export default Trips



