"use strict";
const express = require('express');
const router = require('./routes/index');
const Sequelize = require('sequelize').Sequelize;
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.json');

let app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });