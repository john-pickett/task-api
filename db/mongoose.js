const mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Tasker').then( () => {
    console.log('Connected to MongoDB successfully');
}, (err) => {
    console.log(`Error: ${err}`);
});


module.exports = {mongoose};