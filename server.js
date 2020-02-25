const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const WorkoutModel = require('./models/workout.js')
const db = require('./models');
const app = express();


mongoose.connect('mongodb://localhost/Workout-Tracker', {    
    useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const PORT = process.env.PORT || 4321;


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


// getting Workout Schema from models/workout.js
app.get('/api/workouts', async (request, response) => {
    db.Workout.find({})
        .then(dbWorkout => {
            response.json(dbWorkout)
        })
        .catch(error => {
            response.json(error)
        })
});

// create new workout-->post
app.post('/api/workouts', async (request, response) => {
    const workout = new WorkoutModel({ exercises: request.body });
    WorkoutModel.create(workout)
        .then(dbWorkout => {
            response.json(dbWorkout)
        })
        .catch(error => {
            response
                .status(500)
                .send(error)
        })
});

// edit existing workout-->put
app.put('api/workouts/:id', (request, response) => {
    WorkoutModel.findOneAndUpdate(
        { _id: request.params.id }, 
        { exercises: request.body }, 
        { new: true }
        )
            .then((dbWorkout) => {
                if(!dbWorkout) {
                    console.log(error)
                    response
                        .status(404)
                        .send(error)
                } else {
                    response.json(dbWorkout)
                }
            })
            .catch((error) => {
                console.log(error)
                response
                    .status(500)
                    .send("error occurred")
            })
});

app.put('')

app.get('/api/workouts/range', async (request, response) => {
    db.Workout.find({})
    .then(dbWorkout => {
        response.json(dbWorkout)
    })
    .catch(error => {
        response.send(error)
    })
});



app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});