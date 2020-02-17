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
