const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const WorkoutModel = require('./models/workout.js')
const db = require('./models');
const app = express();
require('dotenv').config();

const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds053784.mlab.com:53784/heroku_mffnqcmb`;
console.log(MONGODB_URI)
const PORT = process.env.PORT || 4321;
//'mongodb://localhost/Workout-Tracker'
mongoose.connect(process.env.MONGODB_URI, {    
    useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});


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
            response.send(error)
        })
});

// create new workout-->post
app.post('/api/workouts', async (request, response) => {
    //if exercise type = resistance then name, weight, sets, reps, duration
    //else if exercise type = cardio then name, distance, duration
    console.log(request.body)
    console.log({ exercises: request.body })
    console.log(request.body.id)
    const workout = new WorkoutModel({ })
    WorkoutModel.create(workout)
        .then(dbWorkout => {
            response.json(dbWorkout)
        })
        .catch(error => {
            response
                .status(501)
                .send(error)
        })
});

// edit existing workout-->put
app.put('/api/workouts/:id', async (request, response) => {

        WorkoutModel.findByIdAndUpdate(
            { _id: request.params.id }, 
            { $push: { exercises: request.body } }, 
            { new: true }
            )
                .then((dbWorkout) => {
                    if(!dbWorkout) {
                        console.log(error)
                        response
                            .status(404)
                            .send(error)
                    } 
                    else {
                        response.json(dbWorkout)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    response
                        .status(500)
                        .send("error occurred")
                })
    })

// getting 7 most recent workouts logged by user
app.get('/api/workouts/range', async (request, response) => {
    db.Workout.find().sort({ day: -1 }).limit(7)
    .then(dbWorkout => {
        response.json(dbWorkout)
    })
    .catch(error => {
        response.send(error)
    })
});

// delete workout by id
app.delete('/api/workouts/:id', async (request, response) => {
    WorkoutModel.findOneAndRemove({ _id: request.params.id })
        .then((dbWorkout) => {
            if(!dbWorkout) {
                response
                    .status(404)
                    .send("workout not found")
            }
            else {
                response
                    .send("deleted successfully")
            }
        })
        .catch((error) => {
            console.log(error)
            response
                .status(500)
                .send("error occurred")
        })
});



app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});