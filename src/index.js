const express = require('express');
let Sequelize = require('./database/database');
const Server = require('./server');
const path = require('path');

let server = new Server(process.env.API_PORT, express());

server.core(new Sequelize, path.join(__dirname, 'models')).then(() =>{
    console.log(`Server listening on port ${process.env.API_PORT}`)
});
