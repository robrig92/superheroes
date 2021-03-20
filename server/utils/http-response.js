"use strict"

const unauthorized = (res) => {
    return (message = '', data = {}) => {
        return res.status(401).json(responseObject(message, data));
    }
}

const ok = (res) => {
    return (message = '', data = {}) => {
        return res.json(responseObject(message, data));
    }
}

const error = (res) => {
    return (message = '', data = {}) => {
        return res.status(500).json(responseObject(message, data));
    }
}

const responseObject = (message = '', data = {}) => {
    return {
        data,
        message
    }
}

module.exports = {
    ok,
    error,
    unauthorized
}
