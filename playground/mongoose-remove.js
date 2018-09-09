const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result)
// });

// Todo.findOneAndRemove({_id:'5b94a4db53d6359260fc7088'}).then((todo) => {
//     console.log(todo)
// });

Todo.findByIdAndRemove('5b94a4db53d6359260fc7088').then((todo) => {
    console.log(todo);
});