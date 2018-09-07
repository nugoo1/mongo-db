const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5b925f13f76cbc742ee106cf11';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid.');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('TodoById', todo);
// }).catch((e) => console.log(e));

User.findById('5b8fadd7760b7970cdf783aa').then((user) => {
    if (!user) {
     return console.log('No user found.')
    }
    console.log('User:', JSON.stringify(user, undefined, 2));
},(e) => {
    console.log(e);
});

