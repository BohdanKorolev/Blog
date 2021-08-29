const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./configs/db');
const account = require('./routes/account');
const category = require('./routes/category');

const app = express();
const port = 3000;

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('Connection successful.');
});
mongoose.connection.on('error', (error) => {
    console.log('Not successful connection.' + error);
});

app.use(passport.initialize());
app.use(passport.session());

require('./configs/passport')(passport);

app.use(cors());

app.use(bodyparser.json());

app.use('/account', account);

app.use('/category', category);

app.get('/', (request, response) => {
    response.send('Home page')
})

app.listen(port, () => {
    console.log('Server is running in port: ' + port + '.');
})