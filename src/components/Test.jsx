import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { styled, ThemeProvider } from "styled-components"

const StyledContainer = styled.div`
`;

const StyledClock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 0.5rem;
    border: 0.25rem solid ${props => props.theme.poke_black};
    background-color: ${props => props.theme.poke_white};
    @media (max-width: 768px) {
        width: 100%;
    }
    
    > * {
        padding: 0.4rem;
    }
    

    a {
        color: ${props => props.theme.poke_black};
        > * {
            padding: 0.4rem;
        }
        border-radius: 0.5rem;
        &:hover {
            background-color: ${props => props.theme.poke_gray};
        }
        img {
            width: 90%;
            border-radius: 1rem;
        }
        &:active {
            background-color: ${props => props.theme.poke_red};
        }
    }
`

function Test()
{
    const [t, setT] = useState("")
    
    let c = undefined

    function strTime(d) {
        return [d.getHours(), d.getMinutes(), d.getSeconds()].map(s => ("0" + s).slice(-2)).join(":")
    }

    function clockJs() {
        if (!c) c = document.getElementById("clock_js")
        c.innerText = strTime(new Date()) + " (js)";
    }
    
    useEffect(() => {
        clockJs();
        setT(strTime(new Date()))
        
        const int_id = setInterval(() => setT(strTime(new Date())), 1000)
        const int_id_js = setInterval(clockJs, 1000)
        
        return () => {
            clearInterval(int_id)   
            clearInterval(int_id_js)   
        }
    }, [t])
    
    return (
        <StyledContainer>
        <StyledClock>
        <h1>{t} (reactjs)</h1>
        <h1 id="clock_js"></h1>
        </StyledClock>
        </StyledContainer>
    )
}

export default Test
