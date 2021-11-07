
const COOKIE_KEY = 'gp-user'

const getSessionStorage = (key = COOKIE_KEY) => {
    if (typeof window !== 'undefined') {
        const value = sessionStorage.getItem(key)
        return JSON.parse(value)
    }
    console.log("Error deploying cookies not allowed")
    return null
}

const setSessionStorage = ({ key = COOKIE_KEY, value = null }) => {
    if (typeof window !== 'undefined') {
        const valueToSave = JSON.stringify(value)
        sessionStorage.setItem(key, valueToSave)
        return value
    }
    console.log("Error deploying cookies not allowed")
    return null
}

const deleteSessionStorage = (key = COOKIE_KEY) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key)
    }
    return null
}


export {
    getSessionStorage as getLocalStorage,
    setSessionStorage as setLocalStorage,
    deleteSessionStorage as deleteLocalStorage
}