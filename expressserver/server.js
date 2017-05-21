const express = require('express');
const bodyParser = require('body-parser');
// const config = require('../config.json');
const Sequelize = require('sequelize');

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

const sequelize = new Sequelize('mysql://christine:password@localhost:3306/todos');

// set up the express app
const app = express();

// parse requests data to json
app.use(bodyParser.json());

// set up model
const Tasks = sequelize.define('todos', {
  todo: {type: Sequelize.STRING},
  complete: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
});

// the following commented out is for creating a first record in the newly defined table
// Tasks.sync().then(() => {
//   return Tasks.create({
//     todo: 'finish project'});
// });

// home route - check if express server working
app.get('/', (req, res) => res.status(200).send({message: 'Welcome to the Restaurant at the End of the Universe.'}));

// return an array of all todos (todos:todos i.e. db:table)
app.get('/todos', (req, res) => {
  Tasks.findAll().then((todos) => {
    res.send(todos);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  Tasks.findById(id).then((todos) => {
    res.send(todos);
  });
});

app.post('/todos', (req, res) => {
  Tasks.build({
    todo: req.body.todo,
    complete: req.body.complete,
  }).save(() => {
    res.send('todo saved');
  });
});

app.listen(5000, () => {
  console.log('Server application listening on port 5000');
});