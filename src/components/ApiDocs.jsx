import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { fetchWithJwt } from '../js/Accounts.js';
import { styled } from 'styled-components';

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

const JsonObject = styled.div`
    font-family: "Source Code Pro", monospace;
    font-optical-sizing: auto;
    font-weight: <weight>;
    font-style: normal;
    display: flex;
    flex-direction: column;
    background-color: #464646;
    border-radius: 1rem;
    padding: 1rem;
    
    background-color: ${props => props.theme.white};
    border: 0.25rem solid ${props => props.theme.black};
`;

const JsonField = styled.div`
    text-indent: 1rem;
`;

const StyledTable = styled.table`
    font-family: "Source Code Pro", monospace;
    font-optical-sizing: auto;
    font-weight: <weight>;
    font-style: normal;
    background-color: ${props => props.theme.white};
    border-radius: 1rem;
    padding: 1rem;

    border: 0.25rem solid ${props => props.theme.black};
`;

const StyledHead = styled.thead`
    border-radius: 0.1rem;
    padding: 0.1rem;
    background-color: {props => props.theme.gray};
    & th {
        text-align: left;
    }
`;

const StyledRow = styled.tr`
    border-radius: 0.1rem;
    padding: 0.1rem;
    border: 0.1rem solid #464646;
    background-color: {props => props.theme.gray};
    &:nth-child(odd) {
        border: 0.1rem solid #666666;
        background-color: {props => props.theme.red};
    }
`;

const StyledCell = styled.td`
    padding: 0.1rem;
    text-align: left;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
    width: 100%;

    a {
        font-family: "Source Code Pro", monospace;
        font-optical-sizing: auto;
        font-weight: <weight>;
        font-style: normal;
        color: black;
        margin-left: 0rem;
    }
`;

function ApiDocs({currentUser}) 
{

    const [apiSpec, setApiSpec] = useState([])

    function parseApiSpec(html) {
        let dummy_node = document.createElement('html');
        dummy_node.innerHTML = html;

        let table = dummy_node.getElementsByTagName("table")[0];
        let tablebody = table.getElementsByTagName("tbody")[0];
        let tablerows = tablebody.getElementsByTagName("tr");

        console.log("table : " + table.innerHTML);
        console.log("tablebody : " + tablebody.innerHTML);
        console.log("tablerows : " + tablerows.length);
        
        let api_spec = [];
        for (let i = 0; i < tablerows.length; i++) {
            let rowelements = tablerows[i].cells;
            api_spec.push({
                method: rowelements[0].innerText,
                path: rowelements[1].innerText,
                roles: rowelements[3].innerText,
            })
        }
        setApiSpec(api_spec);
    }

    function fetchApiSpec() {
        fetch("https://pokedex.obhnothing.dk/api/routes")
            .then(r => {
                return r.text();
            })
            .then(t => {
                parseApiSpec(t);
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        //fetchApiSpec();
    }, [])

    return (
        <StyledContainer>
        <StyledDiv className="trips_table">
        <h1>API Doc</h1>

        <a href="https://github.com/Oskar123456/pokedexcphdat">backend source code</a>
        <a href="https://github.com/Oskar123456/cphdat-sp-3">frontend source code</a>
        
        <StyledTable>

        <StyledHead>
        <tr key={crypto.randomUUID()}>
        <th> method </th>
        <th> path </th>
        <th> role(s) </th>
        </tr>
        </StyledHead>
        <tbody>

        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> <a href={"https://pokedex.obhnothing.dk/api" + "/pokemon"}>/pokemon</a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>
        
        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> <a href={"https://pokedex.obhnothing.dk/api" + "/pokemon/{id}"}>/pokemon/&#123;id&#125;</a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>
        
        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> 
        <a href={"https://pokedex.obhnothing.dk/api" + "/pokemon/habitat"}>
        /pokemon/habitat
        </a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>
        
        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> 
        <a href={"https://pokedex.obhnothing.dk/api" + "/pokemon/habitat/{name}"}>
        /pokemon/habitat/&#123;name&#125;
        </a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>
        
        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> 
        <a href={"https://pokedex.obhnothing.dk/api" + "/pokemon/type"}>
        /pokemon/type
        </a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>

        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> 
        <a href={"https://pokedex.obhnothing.dk/api" + "/pokemon/type/{name}"}>
        /pokemon/type/&#123;name&#125;
        </a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>

        </tbody>
        </StyledTable>
        
        <h3>api format</h3>
        <JsonObject>
        <p>&#123;</p>
        <JsonField> name: "bulbasaur",</JsonField>
        <JsonField> abilities: [ </JsonField>
        <JsonField>&nbsp;&nbsp;&nbsp;&nbsp;&#123; id: 1, name: "curl up" &#125;, </JsonField>
        <JsonField>&nbsp;&nbsp;&nbsp;&nbsp;&#123;...&#125;</JsonField>
        <JsonField>&nbsp;&nbsp; ], </JsonField>
        <JsonField> hp: 10 </JsonField>
        <JsonField> ... </JsonField>
        <p>&#125;</p>
        </JsonObject>

        <h3>error format</h3>
        <JsonObject>
        <p>&#123;</p>
        <JsonField> msg: "Not Found" </JsonField>
        <JsonField> status: "404" </JsonField>
        <JsonField> timestamp: "2024-..." </JsonField>
        <p>&#125;</p>
        </JsonObject>
        
        </StyledDiv>
        </StyledContainer>
    ) 
}

export default ApiDocs




