const mongoose = require("mongoose")
const { Schema } = mongoose;
const slugify = require("slugify");
const Category = require("../models/Category")

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category
    },
    dateOfCreated: {
        type: Date,
        default: Date.now
    },
    slug: {
        unique: true,
        type: String,
    },
});

CourseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;

