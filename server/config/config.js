require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.DATABASE_HOST,
        "dialect": "postgres",
        "operatorsAliases": false
    },
    "test": {
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.DATABASE_HOST,
        "dialect": "postgres",
        "operatorsAliases": false
    },
    "production": {
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.DATABASE_HOST,
        "dialect": "postgres",
        "operatorsAliases": false
    }
}
