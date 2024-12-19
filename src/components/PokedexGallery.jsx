import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import TypeList from './TypeList.jsx'

import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";
import PokemonImgDiv from './PokemonImgDiv.jsx'

const StyledDiv = styled.div`
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.poke_white};
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledPokedexOuter = styled.div`
    background-color: ${props => props.theme.poke_white};
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    padding: 0.5rem;
`;

const StyledPokedexMiddle = styled.div`
`;

const StyledPokedexInner = styled.div`
`;

const StyledPanel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8rem;
    height: 4rem;
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }

`;

const StyledTextInput = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    & div {
        background-color: ${props => props.theme.white};
        display: flex;
        gap: 0.5rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        align-items: center;
        height: 2rem;
        border-radius: 0.5rem;
        border: 0.2rem solid ${props => props.theme.poke_gray};

        & img {
            height: 1.2rem;
        }
        
        & input {
            background-color: ${props => props.theme.white};
            height: 90%;
            border: none;
            caret-color: ${props => props.theme.poke_black};
            font-family: "VT323", serif;
            font-weight: 600;
            font-style: normal;
        }
        
        & input:focus {
            border: none;
            outline: none;
        }
    }
    
`;

const StyledSearchFilters = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    
    & button {
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
        gap: 0.5rem;
        align-items: center;
        display: flex;
        padding-top: 0.1rem;
        height: 2.31rem;
        border-radius: 0.5rem;
        border: 0.2rem solid ${props => props.theme.poke_gray};
        background-color: ${props => props.theme.white};

        & p {
            padding-top: 0.1rem;
        }
    }
    
    & img {
        height: 1.2rem;
        width: 1.2rem;
    }
        
    .search-filter-pokeball {
        transform: rotate(0deg);
        transition: 0.1s linear;
    }

    .search-filter-pokeball.open {
        transform: rotate(90deg);
        transition: 0.1s linear;
    }
`;

const StyledPokedex = styled.div`
    gap: 0.5rem;
    
    width: 100%;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    
    .owned {
        opacity: 0.2;
    }

    
    @media (max-width: 1240px) {
        grid-template-columns: repeat(6, 1fr);
    }
    
    @media (max-width: 940px) {
        grid-template-columns: repeat(4, 1fr);
    }
    
    @media (max-width: 540px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 400px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 380px) {
        grid-template-columns: repeat(1, 1fr);
    }
    
    ul {
        display: flex;
        padding: 0;
        margin: 0 0;
    }
    
    li {
        padding: 0.0rem;;
        margin: 0 0;
    }
`;

const StyledPokemonCard = styled.div`
    /*border: 0.1rem solid ${props => props.theme.poke_black};*/
    border-radius: 0.5rem;
    padding: 0.3rem;
    background-color: ${props => props.theme.poke_gray};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;

    > * {
        margin: 0 0;
        gap: 0;
        width: 100%;
        height: 100%;
        
        img {
            width: 100%;
            height: 100%;
        }
    }

    ul {
        padding-top: 0.2rem;
    }

    li {
        padding-right: 0.2rem;
    }

    li > * { 
        padding: 0.2rem;
    }

    img {
        margin-left: 0;
    }

    &:hover {
        background-color: ${props => props.theme.poke_red};
        cursor: pointer;
    }
    
    & .pokemon-card-title {
        font-size: 1.0rem;
        color: ${props => props.theme.black};
    }

    & p {
        text-align: left;
        font-size: 0.9rem;
        color: ${props => props.theme.poke_black};
    }

    & .pokemon-card-type-container {
        display: flex;
        gap: 0.1rem;
        width: 100%;
        justify-content: flex-begin;
    }
    
    & .pokemon-card-type-container > * {
        width: fit-content;
        border-radius: 0.4rem;
        padding: 0.1rem;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        color: ${props => props.theme.poke_black};
    }

`;

const StyledTypeName = styled.button`
    border-radius: 0.4rem;
    padding: 0.1rem;
    padding-top: 0.2rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    border: none;
    margin: 0.1rem 0;
    background-color: transparent;
    text-decoration: underline;
    font-family: "VT323", serif;
    font-weight: 600;
    font-style: normal;
    &:hover {
        cursor: pointer;
    }
    > * {
        border-radius: 0;
        padding: 0;
        padding-top: 0;
        padding-left: 0;
        padding-right: 0.4rem;
        margin: 0 0;
        border: none;
        background-color: transparent;
        text-decoration: underline;
        opacity: 0.8;
        font-family: "VT323", serif;
        font-weight: 600;
        font-style: normal;
    }
    & .off {
        text-decoration-line: line-through;
    }
`;

const StyledSearchFilterSelectionContainer = styled.div`
    .search-filter-selection {
        max-height: 0;
        transition: max-height 0.1s ease-out;
        overflow: hidden;
        overflow: auto;
    }
    .search-filter-selection.open {
        max-height: 10rem;
        transition: max-height 0.1s ease-in;
        overflow: auto;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0; padding: 0;
        list-style-type: none;
        margin: 0.1rem 0;
        text-align: left;
        overflow: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    }

    li {
        margin: 0 0.1rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    li p {
    }
    
    li:hover {
        cursor: pointer;
    }
    
`;

function PokedexGallery({currentUserPokemon, currentUser, setCurrentUser, pokemon, habitats, types, theme}) {

    const search_icon_url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fsearch-icon-free%2Fsearch-icon-free-2.jpg&f=1&nofb=1&ipt=1a94f787c773e059531231f767efc1759ac05ddda228f902a361dc37d37ac91c&ipo=images";
    const pokeball_icon_url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fpokeball-icon-png%2Fpokeball-icon-png-2.jpg&f=1&nofb=1&ipt=98102c2fa13e3c57fd697e8ad1518c8ab473a23c21ba33ae640888a4c2cb2ae5&ipo=images";

    const [description, setDescription] = useState('');
    const [pokeGrid, setPokeGrid] = useState();
    const [searchFiltersOn, setSearchFiltersOn] = useState(false);
    const [filterHabitats, setFilterHabitats] = useState([])
    const [filterTypes, setFilterTypes] = useState([])

    function isPokemonOwned(p) {
        if (currentUserPokemon && currentUserPokemon.length > 0)
            return (currentUserPokemon.filter(pl => pl.id === p.id).length > 0);
        return true;
    }
    
    function makePokeGrid(p_list, type_filter)
    {
        if (!p_list) return <h1>No Data for makePokeGrid</h1>;

        if (type_filter && type_filter.length > 0) {
            p_list = p_list.filter(p => p.types.map(t => t.name)
                .filter(n => !type_filter.map(t => t.name).includes(n))
                .length > 0);
        }

        p_list = p_list.sort((a,b) => a.id > b.id);

        const grid = [];
        for (let p of p_list) {
            let owned = false;
            if (currentUserPokemon && currentUserPokemon.length > 0)
                owned = (currentUserPokemon.filter(pl => pl.id === p.id).length > 0);
            let habitat_name = p.habitat.name.replace("-", "_");
            let ent = (
                <Link key={crypto.randomUUID()} to={'/pokedex/pokemon/' + p.name}>
                <StyledPokemonCard className={owned ? "owned" : "unowned"} key={crypto.randomUUID()} > 
                <PokemonImgDiv pokemon={p} />
                <p>{"#" + ("000" + p.id).slice(-3)}</p>
                <p className="pokemon-card-title">{!owned ? capitalizeWord(p.name) : "???"}</p>
                {!owned ? <TypeList theme={theme} types={p.types} /> : <p>"???"</p>}
                </StyledPokemonCard>
                </Link>
            );
            grid.push(ent);
        }
        setPokeGrid(grid);
    }

    function filterType(t) {
        let new_filter = filterTypes.filter(t2 => t2.name != t.name);
        if (new_filter.length === filterTypes.length)
            new_filter.push(t);
        console.log(new_filter.map(t => t.name));
        setFilterTypes(new_filter);
        makePokeGrid(pokemon, new_filter);
    }
    
    function makeTypeList()
    {
        if (!types || types.length < 1) return <h1>No Data for makeTypeList</h1>;

        const tps = [];
        let type_names_normalized = equalizeStrLens(types.map(t => t.name));
        for (let i = 0; i < types.length; i++) {
            let c = (filterTypes.includes(types[i]));
            let ent = (<li key={crypto.randomUUID()}>
                <StyledTypeName onClick={() => filterType(types[i])} style={colorCodeType(theme, types[i])}>
                    <pre className={c ? "off" : ""}>{capitalizeWord(type_names_normalized[i])}</pre>
                </StyledTypeName>
                </li>);
            tps.push(ent);
        }
        return <ul className="type-list">{tps}</ul>
    }

    function buttonCrsClickCB(e) {
        let img = document.getElementById("pokeball-img");
        let containerOuter = document.getElementById("search-filter-selection-container");
        containerOuter.style.display = "flex";
        let container = document.getElementById("search-filter-selection");
        if (searchFiltersOn) {
            img.className = "search-filter-pokeball";
            container.className = "search-filter-selection";
            setSearchFiltersOn(false);
        }
        else {
            img.className ="search-filter-pokeball open";
            container.className = "search-filter-selection open";
            setSearchFiltersOn(true);
        }
    }

    function searchInputCB(e) {
        console.log(e.target.value);
        let pokemon_filtered = pokemon.filter(p => p.name.toLowerCase().includes(e.target.value));
        makePokeGrid(pokemon_filtered);
    }
    
    function filterCB(e) {
        let pokemon_filtered = pokemon;
        makePokeGrid(pokemon_filtered);
    }

    useEffect(() => {
        makePokeGrid(pokemon);
    }, [pokemon, habitats, types, theme, currentUserPokemon])


    return (
        <StyledPokedexOuter>
        <StyledPokedexMiddle>
        <StyledPokedexInner>
        <StyledDiv >

        <StyledPanel>
            <StyledTextInput>
                <div>
       
                <img src={search_icon_url}/>
                <input onChange={searchInputCB} type="text">
                </input>

                </div>

            </StyledTextInput>
        
            <StyledSearchFilters>
        
            <button onClick={buttonCrsClickCB} >
                <p>Filters</p>
                <img id="pokeball-img" src={pokeball_icon_url}/>
            </button>
        
            </StyledSearchFilters>
        </StyledPanel>

        <StyledSearchFilterSelectionContainer  style={{display: "none"}} id="search-filter-selection-container">
        <div className="search-filter-selection" id="search-filter-selection">
        <h3>Type Filters</h3>
        {(types && types.length > 0) && makeTypeList()}
        <h3>Habitat Filters</h3>
        
        </div>
        </StyledSearchFilterSelectionContainer>

        {(pokemon && pokemon.length > 0) ? (
            <StyledPokedex>{pokeGrid}</StyledPokedex>
        ) : (
            <h1>no search results</h1>
        )}

        </StyledDiv>
        </StyledPokedexInner>
        </StyledPokedexMiddle>
        </StyledPokedexOuter>
    ) 
}

export default PokedexGallery



