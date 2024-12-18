import { HttpRequestAsJson } from "./HttpRequest.js"

const base_url = "https://exam.obhnothing.dk/api";
const endpt_login = "/auth/login";

let user_current = {};
let logged_in = false;

function login(uname, upassword, uset, errorCallback) 
{
    fetch("https://exam.obhnothing.dk/api/auth/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: uname,
            password: upassword
        })
        })
        .then((response) => { 
            if (!(response.status === 200)) {
                errorCallback("failed to login");
                return;
            }
            return response.json()
        })
        .then(jwt => {
            if (!jwt)
                return;
            let u = {};
            let s = jwt.token.split('.');
            let claims = JSON.parse(atob(s[1]));
            u['username'] = claims['username'];
            u['roles'] = claims['roles'];
            u['jwt'] = jwt.token;
            u['loggedIn'] = true;
            console.log("logged in as: " + JSON.stringify(u) + " with token: " + user_current.jwt);
            uset(u);
            user_current = u;
        })
        .catch(err => {
            if (err.fullError) {
                err.fullError.then(ferr => {
                    console.log(ferr);
                    errorCallback(ferr);
                    user_current = {};
                })
            }
            else {
                console.log(err);
                errorCallback(err);
            }
        });
}

function signup(uname, upassword, uset, errorCallback) 
{
    fetch("https://exam.obhnothing.dk/api/auth/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: uname,
            password: upassword
        })
        })
        .then((response) => { 
            if (!(response.status === 201)) {
                errorCallback("could not create user");
                return;
            }
            return response.json()
        })
        .then(jwt => {
            if (!jwt)
                return;
            let u = {};
            let s = jwt.token.split('.');
            let claims = JSON.parse(atob(s[1]));
            u['username'] = claims['username'];
            u['roles'] = claims['roles'];
            u['jwt'] = jwt.token;
            u['loggedIn'] = true;
            console.log("signed up: " + JSON.stringify(u) + " with token: " + user_current.jwt);
            uset(u);
            user_current = u;
        })
        .catch(err => {
            if (err.fullError) {
                err.fullError.then(ferr => {
                    console.log(ferr);
                    errorCallback(ferr);
                    user_current = {};
                })
            }
            else {
                console.log(err);
                errorCallback(err);
            }
        });
}

function logout(uset) 
{
    console.log("logging out from: " + JSON.stringify(user_current));
    user_current = {};
    uset({ loggedIn: false })
}

function getUser() 
{
    if (logged_in)
        return jwt;
    return null;
}

function fetchWithJwt(url, callback, errorCallback, method, body) 
{
    //if (!user_current.loggedIn)
    //    return null;

    fetch(url, {
        method: method ? method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user_current.jwt,
        },
        body: body ? JSON.stringify(body) : undefined,
    }).then(res => {
        return res.json()
    }).then(json => {
        if (json.status != undefined)
            console.log('something went wrong: ' + json.message + ' (' + json.status + ')');
        console.log('fetchWithJwt: ');
        console.log(json);
        callback(json);  
    }).catch(err => {
        if (err.fullError)
            err.fullError.then(ferr => errorCallback(ferr));
        else
            errorCallback(err);
    })
}

export { login, logout, signup, getUser, fetchWithJwt }
