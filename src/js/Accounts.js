import { HttpRequestAsJson } from "./HttpRequest.js"

const base_url = "http://localhost:9999/api";
const endpt_login = "/auth/login";

let user_current = {};
let logged_in = false;

function login(uname, upassword, uset) 
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
            console.log("logged in as: " + JSON.stringify(u));
            uset(u);
            user_current = u;
        })
        .catch(err => {
            if (err.fullError) {
                err.fullError.then(ferr => {
                    console.log(ferr);
                    user_current = {};
                })
            }
            else
                console.log(err);
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

export { login, logout, getUser, fetchWithJwt }
