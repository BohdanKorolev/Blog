const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./configs/db');
const account = require('./routes/account');

const app = express();
const port = 3000;

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('Connection successful.');
})
mongoose.connection.on('error', (error) => {
    console.log('Not successful connection.' + error);
})

app.use(cors());

app.use(bodyparser.json());

app.use('/account', account);

app.get('/', (request, response) => {
    response.send('Home page')
})

app.listen(port, () => {
    console.log('Server is running in port: ' + port + '.');
})