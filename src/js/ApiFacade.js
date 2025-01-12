import { HttpRequestAsJson } from "./HttpRequest.js"

const base_url = "https://pokedex.obhnothing.dk/api";

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
            let claims = JSON.parse(atob(jwt.token.split('.')[1]));
            let u = {};
            u['username'] = claims['username'];
            u['roles'] = claims['roles'];
            u['jwt'] = jwt.token;
            u['loggedIn'] = true;
            uset({loggedIn: true});
            localStorage.setItem("user", JSON.stringify(u));
            console.log("logged in as: " + JSON.stringify(u));
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
            let claims = JSON.parse(atob(jwt.token.split('.')[1]));
            let u = {};
            u['username'] = claims['username'];
            u['roles'] = claims['roles'];
            u['jwt'] = jwt.token;
            u['loggedIn'] = true;
            uset({loggedIn: true});
            localStorage.setItem("user", JSON.stringify(u));
            console.log("signed up: " + JSON.stringify(u));
        })
        .catch(err => {
            errorCallback(err);
        });
}

function getExpFromJwt(jwt) {
    let claims = JSON.parse(atob(jwt.split('.')[1]));
    return new Date(claims.exp * 1000)
}

function checkLogin(user, uset) {
    const u = localStorage.getItem("user")
    if (!u) {
        if (user.loggedIn)
            uset({loggedIn: false})
        return
    }
    
    let exp = getExpFromJwt(JSON.parse(u).jwt)
    let now = new Date()
    let n = JSON.parse(u).username
    let d = ("" + (Math.round((exp - now) / 1000 / 60)))

    if (exp < now) {
        console.log("your jwt expired " + Math.abs(d) + " minutes ago, logging out...")
        logout(uset)
        return
    }

    if (!user.loggedIn) {
        console.log("still logged in as " + n + ", jwt expires in " + d + " minutes")
        uset({loggedIn: true})
        return
    }
}

function logout(uset) 
{
    console.log("logging out from: " + localStorage.getItem("user"));
    localStorage.clear()
    uset({ loggedIn: false })
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

export { login, checkLogin, logout, signup, fetchResource, fetchWithJwt }
