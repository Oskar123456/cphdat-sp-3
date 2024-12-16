import React, {useState, useEffect, createContext, useContext} from "react"
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import pokedex_top_2 from '../images/poke_top_2.svg'

const StyledContainer = styled.div`
    padding-top: 2rem;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${props => props.theme.poke_red};
    border-radius: 1rem;
    border: 0.25rem solid ${props => props.theme.black};
    & > * {
    }
`;

function Pokedex()
{

    const theme = useOutletContext();
    
    const url_all_pokemon = "http://localhost:9999/api/pokemon";
    const url_all_habitat = "http://localhost:9999/api/pokemon/habitat";
    const url_all_type = "http://localhost:9999/api/pokemon/type";
    
    const [pokedexOutletState, setPokedexOutletState] = useState({})

    function addToState(name, obj) {
        let o = pokedexOutletState;
        o[name] = obj;
        setPokedexOutletState(o);
        console.log(pokedexOutletState);
    }
    
    useEffect(() => {
    }, [theme]);

    return (
        <StyledContainer>
        <Outlet context={pokedexOutletState}/>
        </StyledContainer>
    )
    
}

export default Pokedex;
