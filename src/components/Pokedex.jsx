import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledPokedex = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.5rem;
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

    & .pokemon-card-type-grass {
        background-color: ${props => props.theme.poke_grass};
    }
    
    & .pokemon-card-type-poison {
        background-color: ${props => props.theme.poke_poison};
        color: ${props => props.theme.poke_white};
    }
`;

function Pokedex({currentUser, setCurrentUser}) {

    const url = "https://exam.obhnothing.dk/api/pokemon";

    const [description, setDescription] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [pokeGrid, setPokeGrid] = useState();

    const habitatImageLinks = {
        grassland: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.craiyon.com%2F2023-12-05%2FjeR-wXkaTWeDD1kiUkFtMA.webp&f=1&nofb=1&ipt=56633f31d666d4da599251b93143a11351ce97b99d1a845171b4a0fd514660c1&ipo=images",
        mountain: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fthumb_back%2Ffw800%2Fbackground%2F20230516%2Fpngtree-animated-mountains-landscape-wallpaper-4k-and-1080p-2px-image_2565761.jpg&f=1&nofb=1&ipt=c32a8cd352a782e872357f10573185982cfa0a145c2cec32b45f0ed8622d936d&ipo=images",
        forest: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images",
        waters_edge: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas1.ftcdn.net%2Fv2%2Fjpg%2F05%2F60%2F01%2F12%2F1000_F_560011279_d7Koa3lB2TvWLwBBUYJoKdgqtTEIqbF8.jpg&f=1&nofb=1&ipt=2088488c40f9d9ea01ec9f209e96ebca32b5bacf3dd7620794b596673c2a9ff6&ipo=images",
    };
    
    function setPokemonWrapper(p_list)
    {
        setPokemon(p_list);
        makePokeGrid(p_list);
    }

    function makePokeGrid(p_list)
    {
        if (!p_list) return <h1>No Data for makePokeGrid</h1>;

        const grid = [];

        for (let p of p_list) {
            let habitat_name = p.habitat.name.replace("-", "_");
            //console.log(p.name);
            //console.log(habitatImageLinks[habitat_name]);
            let ent = (
                <StyledPokemonCard key={crypto.randomUUID()}>
                <img className={p.habitat.name + "-card-habitat"} src={p.sprites.front_default} />
                <p>{"#" + p.id}</p>
                <p className="pokemon-card-title">{p.name}</p>
                <div className="pokemon-card-type-container">
                {
                    p.types.sort((a, b) => a.name > b.name).map(t => {
                        return ( <p className={"pokemon-card-type-" + t.name} key={crypto.randomUUID()}>
                            {t.name.charAt(0).toUpperCase() + t.name.substring(1)}</p>)
                    })
                }
                </div>
                </StyledPokemonCard>
            );
            grid.push(ent);
        }

        for (let p of grid) {
            //console.log(JSON.stringify(p));
        }
        
        setPokeGrid(grid);
    }
    
    useEffect(() => {
        fetch(url).then(r => {
            return r.json();
        }).then(j => {
            setPokemonWrapper(j);
        }).catch(e => {
            console.log("ERROR");
            console.log(e.message);
        })
    }, [])


    return (
        <StyledDiv>

        <StyledPanel> </StyledPanel>

        {pokemon ? (
            <StyledPokedex>{pokeGrid}</StyledPokedex>
        ) : (
            <h1>No Data</h1>
        )}
        
        </StyledDiv>
    ) 
}

export default Pokedex


