import React, { useState, useEffect, createRef } from "react"
import { Outlet, useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

import StatChart from './StatChart.jsx';
import { fetchWithJwt } from '../js/Accounts.js';

const StyledDiv = styled.div`
    font-family: "VT323", serif;
    font-weight: 400;
    font-style: normal;
    
    display: flex;
    flex-direction: column;

    background-color: ${props => props.theme.poke_white};
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    
    padding: 0.5rem;

    > h1 {
        font-weight: 600;
    }
`;

const StyledButton = styled.button`
    display: flex;
    width: fit-content;
    
    font: inherit;
    
    border-radius: 0.4rem;
    background-color: ${props => props.theme.white};
    border: 0.2rem solid ${props => props.theme.poke_black};
    width: fit-content;
    
    margin-right: 0.4rem;
    &:hover {
        border: 0.2rem solid ${props => props.theme.poke_red};
    }

    :active {
        background-color: ${props => props.theme.poke_red};
    }
`;

const StyledStats = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
`

function AccountPage({currentUser, currentUserPokemon, setCurrentUserPokemon, pokemon, theme}) {
    
    useEffect(() => {
        chartByType(200, 100);
    }, [currentUser, currentUserPokemon])

    function addPack(p) {
        console.log(currentUserPokemon);
        let currentPokemon = currentUserPokemon;
        currentPokemon.push(...p);
        setCurrentUserPokemon(currentPokemon);
    }
    
    function getPack() {
        fetchWithJwt("/pokemon/getpack", addPack, (r) => console.log(r), "POST");
    }

    function chartByType(w, h) {
        let d = document.getElementById("chart_by_type");
        if (!d) return;
        
        const canvas = document.createElement("canvas");
        
        let dpr = Math.ceil(window.devicePixelRatio) || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
        
        const context = canvas.getContext('2d')

        context.fillStyle = theme.poke_black;
        context.fillRect(0, 0, w, h)

        while (d.lastChild) {
            d.removeChild(d.lastChild);
        }
        d.appendChild(canvas);
    }
    
    return (
        <StyledDiv>
        { (currentUser && currentUser.loggedIn) ?
            (
                <>
                <h1>My collection</h1>
                <StyledButton onClick={getPack}>Get card pack</StyledButton>
                <h2>Statistics</h2>
                <StyledStats>
                <div id="chart_by_type" />
                </StyledStats>
                </>
            ) : (
                <h1>Not logged in</h1>
            )
        }
        </StyledDiv>
    )

}

export default AccountPage



