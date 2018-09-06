var mongoose = require('mongoose');

var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

// var newUser = new User({
//     email: ' nuwan@gmail.com '
// });

// newUser.save().then((doc) => {
//     console.log('New user added', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('Unable to add new user', e);
// });

// module.exports = {User};

