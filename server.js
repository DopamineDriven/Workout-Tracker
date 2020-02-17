const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Workout = require('./models/workout.js');
const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect('mongodb://localhost/Workout-Tracker', 
{
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true
});

