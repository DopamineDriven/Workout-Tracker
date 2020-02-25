const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Workout = require('./models/workout.js');
const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect('mongodb://localhost/Workout-Tracker', {    
    useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const PORT = process.env.PORT || 3333;


// https://www.npmjs.com/package/morgan
// using predefined format string'tiny'
app.use(morgan('tiny'));

// serving static content for app from public __dir
app.use(express.static('public'));

// parse requests as JSON 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html routes
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/index.html'))
});

app.get('/exercise', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/exercise.html'))
});

app.get('/stats', (request, response) => {
    response.sendFile(path.join(__dirname+'/public/stats.html'))
});