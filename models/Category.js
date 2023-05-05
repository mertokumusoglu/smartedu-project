const mongoose = require("mongoose")
const { Schema } = mongoose;
const slugify = require("slugify");

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        unique: true,
        type: String,
    },
});

CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
