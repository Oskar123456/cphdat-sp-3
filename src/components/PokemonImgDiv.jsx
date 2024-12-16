import { useEffect, useState, useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { styled, ThemeProvider } from "styled-components";
import { NavLink, Link } from "react-router-dom";

import Themes from '../js/Themes.js';
import { colorCodeHabitat, colorCodeType } from "../js/ColorCode.js";
import { capitalizeWord, equalizeStrLens } from "../js/PokeUtils.js";
import { habitatImageLink } from "../js/PokeUtils.js";

const StyledPokemonCard = styled.div`
    & img {
        background-size: cover;
        border-radius: 0.4rem;
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
    
    & .rare-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images");
    }
    
    & .rough-terrain-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images");
    }
    
    & .sea-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images");
    }
    
    & .urban-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images");
    }

    & .cave-card-habitat {
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas2.ftcdn.net%2Fv2%2Fjpg%2F05%2F41%2F35%2F79%2F1000_F_541357914_LeyK2LaNqvfft6JmabJW1424oXCRBcV0.jpg&f=1&nofb=1&ipt=e729ff20a46ec0721696b3950a6cca547cc39b6f8b4e1cc88b4f6d5d87bd3475&ipo=images");
    }
`;


function PokemonImgDiv({pokemon})
{
    return (
        <StyledPokemonCard>
        <img className={pokemon.habitat.name + "-card-habitat"} src={pokemon.sprites.front_default} />
        </StyledPokemonCard>
    )
}

export default PokemonImgDiv
