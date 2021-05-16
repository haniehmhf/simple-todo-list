const mytoken = '01ddd97564de72d38036789a32e7970372df6351';

export function getToken() {
    try {
        return localStorage.getItem('token')
    } catch {
        return false
    }
}

export function setToken(token ) {
    try {
        localStorage.setItem('token', token)
    } catch {
        return false
    }
}

export function authorizeUser() {
    if (!getToken()) {
        let userToken = prompt("You need a todoist a token to login," +
            " you can get it from https://todoist.com or click ok to use my token")
        setToken(userToken || mytoken)
    }
}