const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    name: String,
    completed: Boolean,
    inprogress: Boolean,
    project: { type: Schema.Types.ObjectId, ref: 'Project'}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };

