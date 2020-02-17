const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    //using seed.js from seeders, define day and exercises
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
        // emdedded document, similar to fields in SQL
        // a document within a document
        // defining type, name, duration, weight, reps, sets, distance
        // within an embedded document
      {
        type: {
          type: String,
          trim: true,
          required: "Enter exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter exercise name"
        },
        duration: {
          type: Number,
          required: "Enter exercise duration in minutes"
        },
        weight: {
          type: Number
          //weight in pounds
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
          //distance in miles
        }
      }
    ]
  },
  // Mongoose Virtuals https://mongoosejs.com/docs/tutorials/virtuals.html
  // a property not stored in MongoDB
  // virtuals typically used for computed properties on documents
  // setting virtuals to true to pass properties to response.json()
  {
    toJSON: {
      virtuals: true
    }
  }
);

// https://mongoosejs.com/docs/api/virtualtype.html#virtualtype_VirtualType-get
// incorporate dynamically-created properties to workoutSchema
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total+exercise.duration
    }, 0)
});

const WorkoutModel = mongoose.model("Workout", workoutSchema);

module.exports = WorkoutModel