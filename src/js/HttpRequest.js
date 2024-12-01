function HttpRequest(url, callback, method, body) 
{
    const headers = {
        'Accept': 'application/json',
    };

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    console.log(url);
    fetch(url, options)
        .then((res) => {
            return (res) ? res.json() : {};
        })
        .then((data) => {
            if (callback) {
                callback(data);
            }
        })
        .catch((err) => {
            if (err.status) {
                err.fullError.then((e) => console.log(e.detail));
            } else {
                console.log(err);
            }
        });
}

function HttpRequestAsJson(url, method, body) 
{
    const headers = {
        'Accept': 'application/json',
    };

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = fetch(url, options);

    console.log(url);
    console.log(JSON.stringify(body));
    console.log(res);
    
    return res.json();
}

export { HttpRequestAsJson }
export default HttpRequest
