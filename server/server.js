"use strict";
const express = require('express');
const router = require('./routes/index');
const Sequelize = require('sequelize').Sequelize;
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.js');
const fileUpload = require('express-fileupload');

let app = express();
const port = process.env.PORT || 3001;

app.use(express.static('server/storage'));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: `/tmp/`,
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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
