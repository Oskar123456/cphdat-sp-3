import React, { useState, useEffect, createRef } from "react"
import { Outlet, useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

import PokemonCard from './PokemonCard.jsx';
import { fetchWithJwt } from '../js/ApiFacade.js';

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

    > * {
        margin: 0.4rem 0;
    }

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
    color: ${props => props.theme.poke_black};
    width: fit-content;
    
    margin-right: 0.4rem;
    &:hover {
        border: 0.2rem solid ${props => props.theme.poke_red};
    }

    &:active {
        background-color: ${props => props.theme.poke_red};
    }
`;

const StyledStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem;

    > * {
    }
    
    @media (max-width: 500px) {
        grid-template-columns: repeat(1, 1fr);
    }

    #chart_by_type {
    }
    
    #chart_by_habitat {
    }

    canvas {
        width: 100%;
        height: 100%;
    }
`

const StyledCardPack = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    gap: 0.4rem;
    
    @media (max-width: 840px) {
        grid-template-columns: repeat(5, 1fr);
    }
    
    @media (max-width: 640px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (max-width: 540px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 400px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

const StyledLink = styled.div`
    a {
        display: flex;
        width: fit-content;
        
        font: inherit;
        
        border-radius: 0.4rem;
        background-color: ${props => props.theme.white};
        border: 0.2rem solid ${props => props.theme.poke_black};
        color: ${props => props.theme.poke_black};
        width: fit-content;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        &:hover {
            border: 0.2rem solid ${props => props.theme.poke_red};
        }

        &:active {
            background-color: ${props => props.theme.poke_red};
        }
    }
`

const StyledGallery = styled.div`
    ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        list-style-type: none;
        gap: 0.4rem;
        li {
            display: flex;
            align-items: center;
            margin: 0 0;
            padding: 0;
            gap: 0;
            img {
                width: 100%;
            }
        }
    }
`

function AccountPage({currentUser, currentUserPokemon, setCurrentUserPokemon, pokemon, theme, types, habitats}) 
{

    const [cardPack, setCardPack] = useState([]);
    
    useEffect(() => {
        chartByType();
        chartByHabitat();
        window.addEventListener('resize', chartByType);
        window.addEventListener('resize', chartByHabitat);
    }, [currentUser, currentUserPokemon])

    function addPack(p) {
        if (currentUserPokemon)
            setCurrentUserPokemon(currentUserPokemon.concat(p));
        else
            setCurrentUserPokemon(p);
        setCardPack(p);
    }
    
    function getPack() {
        fetchWithJwt("/pokemon/getpack", addPack, (r) => console.log(r), "POST");
    }

    function renderPack() {
        console.log(cardPack);
        return (
            <StyledCardPack>
            {cardPack.map(p => {
                return (
                    <PokemonCard owned={true} key={crypto.randomUUID()} theme={theme} p={p} /> 
                )})}
            </StyledCardPack>
        ) 
    }

    function generalStats() {
        let p_freqs = new Array(pokemon.length + 1).fill(0);
        for (let p of currentUserPokemon)
            p_freqs[p.id]++;
        let p_uniq = p_freqs.reduce((acc, f) => acc += (f > 0) ? 1 : 0, 0);
        let p_total = pokemon.length;
        let p_owned = currentUserPokemon.length;
        let p_owned_prop = (p_uniq / pokemon.length) * 100;
        let title = <p>You have collected {p_uniq} (unique) out of {p_total} ({p_owned_prop.toString().substr(0,4)}%) POKèMON</p>;

        return title;
    }

    function gallery() {
        let owned_uniq = new Array(pokemon.length + 1);
        let owned_freqs = new Array(pokemon.length + 1).fill(0);
        currentUserPokemon.forEach(p => {
            owned_uniq[p.id] = p;
            owned_freqs[p.id]++;
        });

        let lis = [];
        for (let p of owned_uniq) {
            if (!p) continue;
            lis.push((
               <li key={crypto.randomUUID()}><img src={p.sprites.front_default}/><p>{"x" + owned_freqs[p.id]}</p></li> 
            ));
        }
        return <ul>{lis}</ul>
    }
    
    function chartByHabitat() {
        let d = document.getElementById("chart_by_habitat");
        if (!d || !currentUserPokemon) return;
        
        let font_size = Math.min(window.innerWidth / 38, 20);
        let padding = 4;
        let padding_top = 5;

        let h = font_size * habitats.length;
        let w = window.innerWidth / 3;
        
        const canvas = document.createElement("canvas");
        /* scaling to make image less blurry */
        let dpr = Math.ceil(window.devicePixelRatio) || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
        const context = canvas.getContext('2d')
        /* data init */
        let owned_uniq = new Array(pokemon.length + 1);
        currentUserPokemon.forEach(p => owned_uniq[p.id] = p);
        
        let habitat_freqs_uniq = new Map();

        for (let p of owned_uniq) {
            if (!p) continue;
            habitat_freqs_uniq.set(p.habitat.name, (habitat_freqs_uniq.get(p.habitat.name)) != undefined ? 
                habitat_freqs_uniq.get(p.habitat.name) + 1 : 1);
        }

        /* drawing */
        context.font = `${font_size}px VT323`;
        let max_textwidth = 0;
        let max_textheight = 0;

        for (let h of habitats) {
            let tw = context.measureText(h.name);
            if (tw.width > max_textwidth) max_textwidth = tw.width;
            if (tw.actualBoundingBoxAscent > max_textheight) max_textheight = tw.actualBoundingBoxAscent;
        }
        
        let idx = 0;
        let graph_w = w - max_textwidth;
        let bar_h = max_textheight;
        let bar_d = bar_h + padding;
        
        let max = Math.max(...habitat_freqs_uniq.values());
        for (let [k, v] of habitat_freqs_uniq) {
            context.font = `${font_size * 0.66}px VT323`;
            let tw_w = context.measureText(v.toString()).width;
            
            let bar_w = Math.max(1, (v / max) * graph_w - tw_w * 5);
            let bar_x = w - graph_w + 2 * padding;
            context.fillStyle = theme.poke_red;
            context.fillRect(bar_x, bar_d * idx, bar_w, bar_h);
            
            context.fillStyle = theme.poke_black;
            context.font = `${font_size}px VT323`;
            let tw = context.measureText(k).actualBoundingBoxAscent;
            context.fillText(k, 0, bar_d * idx + tw);
            context.font = `${font_size * 0.66}px VT323`;
            let tw_n = context.measureText(v.toString()).actualBoundingBoxAscent;
            context.fillText(v.toString(), bar_w + bar_x + padding, bar_d * idx + tw_n);
            context.font = `${font_size}px VT323`;
            
            idx++;
        }

        /* replace previous in DOM */
        while (d.lastChild)
            d.removeChild(d.lastChild);
        d.appendChild(canvas);
    }

    function chartByType() {
        let d = document.getElementById("chart_by_type");
        if (!d || !currentUserPokemon) return;
        
        let font_size = Math.min(window.innerWidth / 38, 20);
        let padding = 4;
        let padding_top = 5;

        let h = font_size * types.length;
        let w = window.innerWidth / 3;
        
        const canvas = document.createElement("canvas");
        /* scaling to make image less blurry */
        let dpr = Math.ceil(window.devicePixelRatio) || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
        const context = canvas.getContext('2d')
        /* data init */
        let owned_uniq = new Array(pokemon.length + 1);
        currentUserPokemon.forEach(p => owned_uniq[p.id] = p);
        
        let type_freqs_uniq = new Map();

        for (let p of owned_uniq) {
            if (!p) continue;
            for (let t of p.types) {
                type_freqs_uniq.set(t.name, (type_freqs_uniq.get(t.name)) != undefined ? 
                    type_freqs_uniq.get(t.name) + 1 : 1);
            }
        }

        /* drawing */
        context.font = `${font_size}px VT323`;
        let max_textwidth = 0;
        let max_textheight = 0;

        for (let t of types) {
            let tw = context.measureText(t.name);
            if (tw.width > max_textwidth) max_textwidth = tw.width;
            if (tw.actualBoundingBoxAscent > max_textheight) max_textheight = tw.actualBoundingBoxAscent;
        }
        
        let idx = 0;
        let graph_w = w - max_textwidth;
        let bar_h = max_textheight;
        let bar_d = bar_h + padding;
        
        let max = Math.max(...type_freqs_uniq.values());
        for (let [k, v] of type_freqs_uniq) {
            context.font = `${font_size * 0.66}px VT323`;
            let tw_w = context.measureText(v.toString()).width;
            
            let bar_w = Math.max(1, (v / max) * graph_w - tw_w * 5);
            let bar_x = w - graph_w + 2 * padding;
            context.fillStyle = theme.poke_red;
            context.fillRect(bar_x, bar_d * idx, bar_w, bar_h);
            
            context.fillStyle = theme.poke_black;
            context.font = `${font_size}px VT323`;
            let tw = context.measureText(k).actualBoundingBoxAscent;
            context.fillText(k, 0, bar_d * idx + tw);
            context.font = `${font_size * 0.66}px VT323`;
            let tw_n = context.measureText(v.toString()).actualBoundingBoxAscent;
            context.fillText(v.toString(), bar_w + bar_x + padding, bar_d * idx + tw_n);
            context.font = `${font_size}px VT323`;
            
            idx++;
        }

        /* replace previous in DOM */
        while (d.lastChild)
            d.removeChild(d.lastChild);
        d.appendChild(canvas);
    }
    
    return (
        <StyledDiv>
        { (currentUser && currentUser.loggedIn) ?
            (
                <>
                <h1>My collection</h1>
                <StyledLink>
                <Link to="/pokedex/pokemon">Go to Pokedex</Link>
                </StyledLink>
                <StyledButton onClick={getPack}>Get card pack</StyledButton>
                {cardPack.length > 0 && (
                    renderPack()
                )}
                <h1>Collection</h1>
                {(currentUserPokemon) ? (
                    <>
                    <StyledGallery>
                    {gallery()}
                    </StyledGallery>
                    <h2>Statistics</h2>
                    {generalStats()}
                    <StyledStats>
                    <div>
                    <h3>Distribution by type</h3>
                    <div id="chart_by_type" />
                    </div>
                    <div>
                    <h3>Distribution by habitat</h3>
                    <div id="chart_by_habitat">oe</div>
                    </div>
                    </StyledStats>
                    </>
                ) : (
                    <h2>Loading collection...</h2>
                )}
                </>
            ) : (
                <h1>Not logged in</h1>
            )
        }
        </StyledDiv>
    )

}

export default AccountPage



