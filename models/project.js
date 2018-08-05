const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = Schema({
    name: String,
    notes: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };