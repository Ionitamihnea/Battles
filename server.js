const express = require('express');

const app = express();

const ejs = require('ejs');

const path = require('path');

const request = require("request");

// Static content folder
app.use('/dist', express.static(path.join(__dirname, '/dist')));

// Enable rendering of ejs files for dynamic pages
app.set('view engine', 'ejs');
app.engine('html', ejs.__express);

// Index page
app.get('/', (req, res) => {
    return res.render('index');
});

// Error page
app.get('*', (req, res) => {
    return res.status(404).send('Error 404 - Page not found.')
});

// Handles server port/ip
app.listen(process.env.PORT || 8080, process.env.IP, () => {
    console.log('Server started!')
});