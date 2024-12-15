import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

import Themes from '../js/Themes.js';
import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";

const StyledDiv = styled.div`
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
            height: 95%;
            border: none;
            caret-color: ${props => props.theme.poke_black};
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
        width: 1.4rem;
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
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.5rem;
    @media (min-width: 1000px) {
        grid-template-columns: repeat(8, minmax(0, 1fr));
    }
`;

const StyledPokemonCard = styled.div`
    border: 0.1rem solid ${props => props.theme.poke_black};
    border-radius: 0.5rem;
    padding: 0.5rem;
    /* background-color: ${props => props.theme.poke_gray}; */

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    &:hover {
    border: 0.2rem solid ${props => props.theme.poke_black};
        background-color: ${props => props.theme.poke_red};
        cursor: pointer;
    }
    
    & .pokemon-card-title {
    height: fit-content;
        font-size: 1.0rem;
        color: ${props => props.theme.black};
    }

    & img {
        background-size: cover;
        border-radius: 0.6rem;
        width: 100%;
        height: 100%;
    }

    & .grassland-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.craiyon.com%2F2023-12-05%2FjeR-wXkaTWeDD1kiUkFtMA.webp&f=1&nofb=1&ipt=56633f31d666d4da599251b93143a11351ce97b99d1a845171b4a0fd514660c1&ipo=images");
    }
    
    & .mountain-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fthumb_back%2Ffw800%2Fbackground%2F20230516%2Fpngtree-animated-mountains-landscape-wallpaper-4k-and-1080p-2px-image_2565761.jpg&f=1&nofb=1&ipt=c32a8cd352a782e872357f10573185982cfa0a145c2cec32b45f0ed8622d936d&ipo=images");
    }
    
    & .waters-edge-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F00%2F48%2F58%2F10%2F240_F_48581058_pkT5sMkjFAhgIoV2FjBTE35vhffEME11.jpg&f=1&nofb=1&ipt=cc93c37987ffcbfb9b3189ddc2c65d76dcbd62917c8cc25ca7cf0c719e0710f0&ipo=images");
    }
    
    & .forest-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images");
    }

    & p {
        width: 100%;
        text-align: left;
        font-size: 0.7rem;
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
    background-color: transparent;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
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

function Pokedex({currentUser, setCurrentUser}) {

    const theme = useOutletContext();

    const url_all_pokemon = "http://localhost:9999/api/pokemon";
    const url_all_habitat = "http://localhost:9999/api/pokemon/habitat";
    const url_all_type = "http://localhost:9999/api/pokemon/type";
    const search_icon_url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.zkAzJ6tsBorjt0W613AbwAHaHa%26pid%3DApi&f=1&ipt=cedf55d33c90422aa55cccd31464f32af8e892be267a8e0777468532923c5683&ipo=images";
    const pokeball_icon_url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Fi%2F4b14c981-e3c8-4be0-89fd-ee3e41ce84b1%2Fd9rc284-605c99d0-4da6-4054-ad5a-34547bf3cd8a.png%2Fv1%2Ffill%2Fw_979%2Ch_816%2Cq_70%2Cstrp%2Fpokeball_black_icon_by_ryuu_orochi_d9rc284-pre.jpg&f=1&nofb=1&ipt=b43864bfa95b32f95cb4c18f2f74f91016ebc78903919409b762202e8f1ed95d&ipo=images";

    const [description, setDescription] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [pokeGrid, setPokeGrid] = useState();
    const [searchFiltersOn, setSearchFiltersOn] = useState(false);
    const [habitats, setHabitats] = useState([])
    const [filterHabitats, setFilterHabitats] = useState([])
    const [types, setTypes] = useState([])
    const [filterTypes, setFilterTypes] = useState([])

    const habitatImageLinks = {
        grassland: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.craiyon.com%2F2023-12-05%2FjeR-wXkaTWeDD1kiUkFtMA.webp&f=1&nofb=1&ipt=56633f31d666d4da599251b93143a11351ce97b99d1a845171b4a0fd514660c1&ipo=images",
        mountain: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fthumb_back%2Ffw800%2Fbackground%2F20230516%2Fpngtree-animated-mountains-landscape-wallpaper-4k-and-1080p-2px-image_2565761.jpg&f=1&nofb=1&ipt=c32a8cd352a782e872357f10573185982cfa0a145c2cec32b45f0ed8622d936d&ipo=images",
        forest: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images",
        waters_edge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas1.ftcdn.net%2Fv2%2Fjpg%2F05%2F60%2F01%2F12%2F1000_F_560011279_d7Koa3lB2TvWLwBBUYJoKdgqtTEIqbF8.jpg&f=1&nofb=1&ipt=2088488c40f9d9ea01ec9f209e96ebca32b5bacf3dd7620794b596673c2a9ff6&ipo=images",
    };

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }
    
    function setPokemonWrapper(p_list)
    {
        setPokemon(p_list);
        makePokeGrid(p_list);
    }

    function makePokeGrid(p_list, type_filter)
    {
        if (!p_list) return <h1>No Data for makePokeGrid</h1>;

        if (type_filter && type_filter.length > 0) {
            console.log("in makePokeGrid: " + JSON.stringify(type_filter.map(t => t.name)));
            console.log(p_list.length);
            p_list = p_list.filter(p => p.types.map(t => t.name)
                .filter(n => !type_filter.map(t => t.name).includes(n))
                .length > 0);
            console.log(p_list.length);
        }

        p_list = p_list.sort((a,b) => a.id > b.id);

        const grid = [];
        for (let p of p_list) {
            let habitat_name = p.habitat.name.replace("-", "_");
            let ent = (
                <StyledPokemonCard key={crypto.randomUUID()}>
                <img className={p.habitat.name + "-card-habitat"} src={p.sprites.front_default} />
                <p>{"#" + ("000" + p.id).slice(-3)}</p>
                <p className="pokemon-card-title">{p.name}</p>
                <div className="pokemon-card-type-container">
                {
                    p.types.sort((a, b) => a.name > b.name).map(t => {
                        return ( <StyledTypeName style={colorCodeType(theme, t)} key={crypto.randomUUID()}>
                            {capitalize(t.name)}</StyledTypeName>)
                    })
                }
                </div>
                </StyledPokemonCard>
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
        //console.log(filterTypes.map(t => t.name));
        setFilterTypes(new_filter);
        makePokeGrid(pokemon, new_filter);
    }
    
    function makeTypeList()
    {
        if (!types || types.length < 1) return <h1>No Data for makeTypeList</h1>;

        const tps = [];
        for (let t of types) {
            let c = '';
            if (filterTypes.includes(t)) c = '❎';
            else c ='✅'; //use classname in callback click function to filter pokemons
            let ent = (<li  key={crypto.randomUUID()} >
                <StyledTypeName onClick={() => filterType(t)} style={colorCodeType(theme, t)}>
                    {capitalize(t.name) + " " + c}
                </StyledTypeName>
                </li>);
            tps.push(ent);
        }
        //console.log((tps));
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
        fetch(url_all_pokemon).then(r => {
            return r.json();
        }).then(j => {
            setPokemonWrapper(j);
        }).catch(e => {
            console.log(e.message);
        });
        
        fetch(url_all_type).then(r => {
            return r.json();
        }).then(j => {
            setTypes(j);
        }).catch(e => {
            console.log(e.message);
        });
        
        fetch(url_all_habitat).then(r => {
            return r.json();
        }).then(j => {
            setHabitats(j);
        }).catch(e => {
            console.log(e.message);
        });
    }, [])


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

        {(pokeGrid && pokeGrid.length > 0) ? (
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

export default Pokedex


