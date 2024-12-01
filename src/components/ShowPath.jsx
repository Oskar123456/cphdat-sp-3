import React, { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router";
import { NavLink, Link } from "react-router";

function ShowPath() {
    
    let acc = '';
    let location = useLocation();
    const [path, setPath] = useState("")

    useEffect(() => {
        acc = '';
        setPath(location.pathname);
    }, [location])

    return (
        <div className="show_path">
        { path &&
            path.split('/').map(sp => {
                if (sp.length > 0) {
                    acc += '/' + sp;
                    return (<Link key={crypto.randomUUID()} className="path_substr" 
                        to={acc}>{'→' + sp}</Link>)
                }
            }                
            )
        }
        </div>
    )

}

export default ShowPath


