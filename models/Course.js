const mongoose = require("mongoose")
const { Schema } = mongoose;

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    dateOfCreated: {
        type: Date,
        default: Date.now
    },
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;

