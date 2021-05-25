const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number},
        name: { type: String, require: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String },
        videoId: { type: String, require: true },
        slug: { type: String, slug: 'name', unique: true }
    },
    {
        _id: false,
        timestamps: true
    });

// Add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);
