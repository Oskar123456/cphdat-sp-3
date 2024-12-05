import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { fetchWithJwt } from '../js/Accounts.js'

function Trip({currentUser}) {

    const [error, setError] = useState("")
    const [trip, setTrip] = useState()
    let { "*": splat } = useParams();

    useEffect(() => {
        fetchWithJwt("https://157.245.73.150:9999/api/trips" + splat, setTrip, setError);
    }, [])

    return (
        <div className="trip_display">

        { trip && !trip.message ?
            (
                <>
                <h1>{trip.name}</h1>
                <h2>detaljer</h2>
                <ul> 
                <li>{trip.price + ' DKK'}</li>
                <li>{trip.startposition}</li>
                <li>{trip.starttime}</li>
                <li>{trip.guide.firstname}</li>
                </ul>
                </>
            )
        :
            (
                <h1>{trip && trip.message}</h1>
            )
        }
        
        </div>
    ) 
}

export default Trip




