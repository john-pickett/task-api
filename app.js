const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

const { Task } = require('./models/task');
const { Project } = require('./models/project');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
  });

  app.listen(port, () => {
    console.log(`started up at ${port}`);
});

// Task Routes
app.get('/tasks', (req, res) => {
    // console.log('getting tasks')
    Task.find().populate('project').then((tasks) => {
        res.send({tasks});
    })
}, (e) => {
    res.status(400).send(e);
});

app.post('/tasks', (req, res) => {
    console.log('posting task ' + req.body.name + req.body.project)
    const projectName = req.body.project;

    Project.findOne({
        name: projectName
    }).then((project) => {
        console.log('project is ' + project);
        const projectID = ObjectID(project._id);
        // console.log(projectID)
        const task = new Task({
            name: req.body.name,
            project: projectID,
            completed: false,
            inprogress: false
        });

        task.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        });
    });
 
});

app.put('/tasks/edit/:id', (req, res) => {
    let id = req.params.id;
    let inprogress = req.body.inprogress;
    let completed = req.body.completed;

    Task.findOneAndUpdate( {_id: id}, { inprogress: inprogress, completed: completed} ).then((doc) => {
        res.send(doc)
        console.log('edit task successful')
    });
    
});

// Project Routes
app.get('/projects', (req, res) => {
    // console.log('getting projects')
    Project.find().then((projects) => {
        res.send({projects});
    });
    }, (e) => {
        res.status(400).send(e);
});

app.post('/projects', (req, res) => {
    // console.log('posting project' + req.body.name);

    const project = new Project({
        name: req.body.name,
        notes: 'Notes here...'
    });
    project.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Combined Routes
app.get('/populated', (req, res) => {
    // Project.find().populate('tasks').then((projects) => {
    //     res.send({projects})
    // });
    Task.find().populate('project').then((tasks) => {
        res.send({tasks});
    })
});
