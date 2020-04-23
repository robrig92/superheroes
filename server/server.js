"use strict";
const express = require('express');
const router = require('./routes/index');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

const sequelize = new Sequelize('heroes', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });