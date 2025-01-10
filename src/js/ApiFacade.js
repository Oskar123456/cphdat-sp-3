import { HttpRequestAsJson } from "./HttpRequest.js"

const base_url = "https://pokedex.obhnothing.dk/api";
const endpt_login = "/auth/login";

function login(uname, upassword, uset, errorCallback) 
{
    fetch(base_url + "/auth/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: uname,
            password: upassword})
        })
        .then((response) => { 
            if (!(response.status === 200))
                throw new Error("failed to login");
            return response.json()
        })
        .then(jwt => {
            let u = {};
            let s = jwt.token.split('.');
            let claims = JSON.parse(atob(s[1]));
            u['username'] = claims['username'];
            u['roles'] = claims['roles'];
            u['jwt'] = jwt.token;
            u['loggedIn'] = true;
            localStorage.setItem("user", JSON.stringify(u));
            console.log("logged in as: " + JSON.stringify(u));
            uset({loggedIn: true});
        })
        .catch(err => {
            errorCallback(err);
        });
}

function signup(uname, upassword, uset, errorCallback) 
{
    fetch(base_url + "/auth/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: uname,
            password: upassword})
    })
        .then((response) => { 
            if (!(response.status === 201))
                throw new Error("could not create user");
            return response.json()
        })
        .then(jwt => {
            let u = {};
            let s = jwt.token.split('.');
            let claims = JSON.parse(atob(s[1]));
            u['username'] = claims['username'];
            u['roles'] = claims['roles'];
            u['jwt'] = jwt.token;
            u['loggedIn'] = true;
            localStorage.setItem("user", JSON.stringify(u));
            console.log("signed up: " + JSON.stringify(u));
            uset({loggedIn: true});
        })
        .catch(err => {
            errorCallback(err);
        });
}

function logout(uset) 
{
    console.log("logging out from: " + JSON.stringify(localStorage.getItem("user")));
    localStorage.clear()
    uset({ loggedIn: false })
}

function getUser() 
{
    if (logged_in)
        return jwt;
    return null;
}

function fetchResource(resource, callback, errorCallback, method, body) 
{
    fetch(base_url + resource, {
        method: method ? method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(res => {
        if (!(res.status === 200))
            throw new Error("failed to fetch " + resource);
        return res.json()
    }).then(json => {
        callback(json);  
    }).catch(err => {
        errorCallback(err);
    })
}

function fetchWithJwt(resource, callback, errorCallback, method, body) 
{
    if (!localStorage.getItem("user"));
    
    fetch(base_url + resource, {
        method: method ? method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("user")).jwt,
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(res => {
        if (!(res.status === 200))
            throw new Error("failed to fetch " + resource);
        return res.json()
    }).then(json => {
        callback(json);
    }).catch(err => {
        errorCallback(err);
    })
}

export { login, logout, signup, getUser, fetchResource, fetchWithJwt }
