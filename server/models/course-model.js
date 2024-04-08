const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    ref: "User",
    // required: true,
    // minLength: 6,
    // maxLength: 100,
  },
  students: {
    type: [String],
    default: [],
  },
  // ///test
  // email: {
  //   type: String,
  //   required: true,
  //   minLength: 6,
  //   maxLength: 100,
  // },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
