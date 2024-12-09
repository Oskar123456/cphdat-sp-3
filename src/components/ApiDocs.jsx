import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { Outlet } from "react-router";
import { fetchWithJwt } from '../js/Accounts.js';
import { styled } from 'styled-components';

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
    
    border: 0.4rem solid black;
`;

const StyledTable = styled.table`
    font-family: "Source Code Pro", monospace;
    font-optical-sizing: auto;
    font-weight: <weight>;
    font-style: normal;
    background-color: #464646;
    border-radius: 1rem;
    padding: 1rem;

    border: 0.4rem solid black;
`;

const StyledHead = styled.th`
    border-radius: 0.2rem;
    padding: 0.2rem;
    border: 0.2rem solid #464646;
    background-color: #464646;
`;

const StyledRow = styled.tr`
    border-radius: 0.2rem;
    padding: 0.2rem;
    border: 0.2rem solid #464646;
    background-color: #464646;
    &:nth-child(odd) {
        border: 0.2rem solid #666666;
        background-color: #666666;
    }
`;

const StyledCell = styled.td`
    padding: 0.2rem;
`;

const JsonField = styled.div`
    text-indent: 1rem;
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
        fetch("https://exam.obhnothing.dk/api/routes")
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
        fetchApiSpec();
    }, [])

    return (
        <div className="trips_table">
        <h1>API Doc</h1>
        <a href="https://exam.obhnothing.dk/api/routes">Api Link</a>
        
        <StyledTable>

        <thead>
        <tr key={crypto.randomUUID()}>
        <th> method </th>
        <th> path </th>
        <th> role(s) </th>
        </tr>
        </thead>
        <tbody>

        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> <a href={"https://exam.obhnothing.dk/api" + "/pokemon"}>/pokemon</a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>
        
        <StyledRow key={crypto.randomUUID()}>
        <StyledCell> GET </StyledCell>
        <StyledCell> <a href={"https://exam.obhnothing.dk/api" + "/pokemon"}>/pokemon/&#123;id&#125;</a> </StyledCell>
        <StyledCell> [ANYONE] </StyledCell>
        </StyledRow>

        </tbody>
        </StyledTable>

        <h3>error format</h3>
        <JsonObject>
        <p>&#123;</p>
        <JsonField> msg: "Not Found" </JsonField>
        <JsonField> status: "404" </JsonField>
        <JsonField> timestamp: "2024-..." </JsonField>
        <p>&#125;</p>
        </JsonObject>
        
        </div>
    ) 
}

export default ApiDocs




