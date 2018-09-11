# MongoDB

![MongoDB](https://webassets.mongodb.com/_com_assets/cms/MongoDB-Logo-5c3a7405a85675366beb3a5ec4c032348c390b3f142f5e6dddf1d78e2df5cb5c.png)

## Prerequisites

### Installing MongoDB

<a href="https://www.mongodb.com/">Click here to install MongoDB.</a> 

Once you have MongoDB installed, from your terminal, navigate to the directory where you downloaded and installed MongoDB, and open up the bin folder.
Here, you have access to the MongoDB database. 

### Connecting to the database

First create a local directory to store your data. I made the folder in my users directory. Once you've done that, go ahead and run the following command:

`mongod.exe --dbpath /Users/Nuwan/mongo-data`

*You should see a message saying something along the lines of 'waiting for connection on port 27017'*

Open up a separate terminal and navigate to the same directory as before.
You can now run the following command:

`mongo.exe`

*You are now connected to the database. Next, we'll be installing a GUI to see our database.*

### Installing Robomongo GUI

Install <a href="https://robomongo.org/download">Robomongo GUI</a>

You can now use mongodb in your application and use Robomongo to view your data.


## Getting Started

If you followed the instructions above, you are all set! You can run npm install mongodb and start using it in your application! For more information, visit the <a href="https://github.com/mongodb/node-mongodb-native">MongoDB Native Website.</a>

`npm install mongodb@2.2.5`

### Connecting to the MongoDB database and inserting a collection:

```
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server', err)
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});

```

## Querying your database

### Find documents:

```
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err)
    });
 ```

 *The toArray() function converts the cursor to an array of documents.*

 If you want to query with certain arguments:

 ```
    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err)
    });
```

Notice we have queried the database for only documents with the property *completed: false*.

### Query by id

```
    db.collection('Todos').find({
        _id: new ObjectID('5b8ed00f55c2db887cbc979f')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err)
    });
```

MongoDB automatically generated a unique ID for your documents. To extract the timestamp, run _id.getTimestamp() function as follows:

```
    db.collection('Users').insertOne({
        name: "Nuwan",
        age: 25,
        location: "Colombo"
    }, (err, results) => {
        if (err) {
            return console.log('Unable to insert user', err)
        };
        console.log(results.ops[0]._id.getTimestamp());
    });
```

Notice that we cannot simply use the id as a string, we need to specify that it is an ObjectID by *first importing objectID from mongodb* and then using it as above.

### Using other functions provided by MongoDB

Another function provided by mongodb is count(). This returns the number of documents in your query. Here, we count the total number of documents, but if you pass in certain arguments, you can count how many documents match your query.

```
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err)
    });
```

Follow the same principle when using other functions provided by MongoDB. You can find the <a href="http://mongodb.github.io/node-mongodb-native/3.1/api">documentation here.</a>

### Deleting documents

deleteMany():
```
    db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
        console.log(result);
    });
```
![deleteMany](https://github.com/nugoo1/mongo-db/blob/master/images/deleteMany.PNG)

deleteOne():
```
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });
```
![deleteOne](https://github.com/nugoo1/mongo-db/blob/master/images/deleteOne.PNG)

findOneAndDelete():
```
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });
```

*This function shows you the document that was deleted. Printing the two functions deleteMany() and deleteOne() using console.log isn't as useful, so you can alternatively leave out the .then() callback.*

![findOneAndDelete](https://github.com/nugoo1/mongo-db/blob/master/images/findOneAndDelete.PNG)

### Updating documents

findOneAndUpdate() passing in $set as the second argument and options as the third argument <a href="http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOneAndUpdate">(Documentation Here)</a>:
```
    findOneAndUpdate()
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b8f82bb0f59f61c2c8feab6')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
```
findOneAndUpdate() using $inc to increment/decrement a property value, passing in an object alongside set as the second object:

*The following increments the age property by 1*

```
    db.collection('Users').findOneAndUpdate({
        name: 'Jen'
    }, {
        $set: {
            name: 'Nuwan'
        }, $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
```

# Mongoose

<a href="![Mongoose](https://cdn-images-1.medium.com/max/1600/1*rchG6FrxrvUsgxnfgoq8ow.png)">![Mongoose](https://cdn-images-1.medium.com/max/1600/1*rchG6FrxrvUsgxnfgoq8ow.png)</a>

`npm i mongoose@4.5.9 --save`

### Connecting to database

With mongoose, you don't have to make a callback. Mongoose makes sure that it first connects to the database before running any of the code below it, so the code looks much simpler!

```
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');
```

### Adding Promises to Mongoose

By default, mongoose uses callbacks, but we're going to be using promises - which is great for scaling.
To tell mongoose to use the default promises library instead of a 3rd party library, we use the following command.
(promises weren't built into javascript until recently, 3rd party libraries like bluebird were the go to).

```
mongoose.Promise = global.Promise;
```

### Using Models

Specifying the properties of the model:

```
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
```

Adding a new document to the model:

```
var newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('Unable to save todo')
});
```
![addingDocument](https://github.com/nugoo1/mongo-db/blob/master/images/addingDocument.PNG)

```
var secondTodo = new Todo({
    text: 'Eat dinner',
    completed: false,
    completedAt: 19
});

secondTodo.save().then((doc) => {
    console.log('Saved todo', JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to save todo', e);
});
```
![addingDocument](https://github.com/nugoo1/mongo-db/blob/master/images/addingDocument2.PNG)

### Mongoose Validation

<a href="https://mongoosejs.com/docs/validation.html">Mongoose Validations Docs.</a>

```
var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var newUser = new User({
    email: ' nuwan@gmail.com '
});

newUser.save().then((doc) => {
    console.log('New user added', JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('Unable to add new user', e);
});

```
![adding new user](https://github.com/nugoo1/mongo-db/blob/master/images/newUser.PNG)

*Typecasting exists in Mongoose, so it'll turn your inputted numbers and booleans into strings.*

## Installing Postman
Postman lets you create HTTP requests and fire them off. It makes sure everything you're writing is working, letting you play around with your data and see how everything works as you move through your API.

Download postman from <a>https://www.getpostman.com/.</a> 
*If you have any problems starting it up, try setting New Environment Variables as explained <a href="https://www.getpostman.com/docs/v6/postman/launching_postman/installation_and_updates">here.</a>*


### Creating an API Endpoint

We use the same functionality to save data received from a post method in our database.

We use some express middleware to parse the data into a json object.

```
var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});
```

## Testing Your Application

See testing examples <a href="https://github.com/nugoo1/testing-with-node">here.</a>

For more information on supertests, you can find the <a href="https://github.com/visionmedia/supertest/">docs here.</a>

To download all test dependencies as dev-dependencies, run the following command in the terminal:

`npm i expect@1.20.2 mocha@3.0.2 nodemon@1.10.2 supertest@2.0.0 --save-dev`

The following code runs two tests:
1. Making sure that when we post new data, it is saved in the database.
2. Making sure that if we pass invalid data, it is not saved in the database. (This relies on assertions previously created to test data validation).

```
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});
```
### Mongoose Queries

<a href="https://mongoosejs.com/docs/queries.html">Mongoose Query Documentation Here.</a>

![findOne](https://github.com/nugoo1/mongo-db/blob/master/images/mongooseFind.PNG)


With Mongoose you don't need to pass in ObjectIDs. It does that for you.

```
var id = '5b925f13f76cbc742ee106cf';

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});
```

If you want to only find one document, the following code *returns an Object instead of an Array.*
If there are no documents found from the query, it will return null, which is useful.

```
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todos', todo);
});
```
The following code lets you find the document by ID, without having to specify an object.

```
Todo.findById(id).then((todo) => {
    console.log('TodoById', todo)
});
```

Using null to do something.
```
Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('TodoById', todo)
});
```
We use mongodbs ObjectID function to validate ID's:

```
const {ObjectID} = require('mongodb');

const id = 1231u89fhjre92d322;

if (!ObjectID.isValid(id)) {
    console.log('ID not valid.');
}
```
The following is a practical example:

```
User.findById('5b8fadd7760b7970cdf783aa').then((user) => {
    if (!user) {
     return console.log('No user found.')
    }
    console.log('User:', JSON.stringify(user, undefined, 2));
},(e) => {
    console.log(e);
});
```

![Returns user object](https://github.com/nugoo1/mongo-db/blob/master/images/mongooseExample.PNG)

Taking user parameters and validating:

```
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo})
    }).catch((e) => {
        res.status(400).send();
    });
});
```
Testing with validation 
```
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}]


    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString()
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
});
```
### Deleting documents from our database with Mongoose
Mongoose gives us 3 ways to remove a document.

```
Todo.remove({}).then((result) => {
    console.log(result)
});

Todo.findOneAndRemove({_id:'5b94a4db53d6359260fc7088'}).then((todo) => {
    console.log(todo)
});

Todo.findByIdAndRemove('5b94a4db53d6359260fc7088').then((todo) => {
    console.log(todo);
});

```

## Deploying to Heroku

Add this to your server file.

`const port = process.env.PORT || 3000;`

Add a start script to your package.json file.

`"start": "node server/server.js"`

In your package.json file, specify which version of node you want Heroku to use.

```
  "engines": {
    "node": "8.11.3"
}
```
Next, create a new heroku app using:
`heroku create`

Next, add on mongolab:
`heroku addons:create mongolab:sandbox`

Run the following code to get your mongodb URI:
`heroku config`

Add this to your mongoose connect file:

```
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
```

### Setting up a Test Database
Update this line of code in your test script in your package.json file:

`"test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",`

Add this to your server file:
```var env = process.env.NODE_ENV;

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
```

What this does is when you're testing with mocha, you will be manipulating data from the TodoAppTest database and in your normal database for development.
On Heroku, it will be connected to mongolab on your mongoose.js file:

`mongoose.connect(process.env.MONGODB_URI);`

*Heroku sets "NODE_ENV=production" by default.*

### Custom Validation with Mongoose

You can use a custom validator with Mongoose. The schema is outline below.

```
var schema = new Schema({
  name: {
    type: String,
    required: true
  }
});
var Cat = db.model('Cat', schema);

// This cat has no name :(
var cat = new Cat();
cat.save(function(error) {
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');

  error = cat.validateSync();
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');
});
```

We will be using the <a href="https://www.npmjs.com/package/validator">validor</a> npm package to validate our emails.

`npm install validator@5.6.0 --save`

```
const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
```
We can then use the following code to create an API endpoint to create a new user.

```
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((doc) => {
        res.send(doc);
    }).catch((e) => res.status(400).send(e));
});
```

## JWT & Hashing
We will be using crypto-js to play around with how hashing and JWT works. After that, we'll actually be using jsonwebtoken to get this done. But, to get a good understanding of how JWT works, let's play around with crypto-js.

`npm install crypto-js@3.16 --save`

```
const {SHA256} = require('crypto-js');

var message = 'I am user number 3';

var hash = SHA256(message).toString();

console.log('Message:', message);
console.log('Hash:', hash);
```

![crypto-js](https://github.com/nugoo1/mongo-db/blob/master/images/hashing.PNG)

The following code adds a hash value along with the id, which we can compare with other hashes later to see if any data was changed.
This still isn't fullproof but it's a good start. We will be adding 'salting' to make if fullproof later on.

```
var data = {
    id: 4
};
var token = {
    data,
    hash: SHA256(JSON.stringify(data)).toString()
};

```
Salting adds a secret value that is only stored on the server. It is used to encrypt and decrypt the data, which ensures the user cannot manipulate the data or use hashing to get the exact value as they won't have access to the 'salt'.

```
var data = {
    id: 4
};
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust.');
}
```

```
var data = {
    id: 4
};
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust.');
}
```

![crypto-js](https://github.com/nugoo1/mongo-db/blob/master/images/hashing2.PNG)

### JWT
To encode data, we use jwt.sing, passing in the data we want to verify along with the salt.

```
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
```

![jsonwebtoken](https://github.com/nugoo1/mongo-db/blob/master/images/jwt.PNG)


To decode it, we use jwt.verify, passing in the data we want to verify along with the salt.
```
var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log('token', token);

var decoded = jwt.verify(token, '123abc')
console.log('decoded', decoded)

```
![jsonwebtoken](https://github.com/nugoo1/mongo-db/blob/master/images/jwt2.PNG)

If anything goes wrong, you will get an 'invalid signature' error.

#### Adding JWT to the User Model

Instead of passing in the user model directly into mongoose, we're going to use mongoose schema to enable us to add custom instance or model methods.

```
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

var User = mongoose.model('User', UserSchema);
```
Creating a jwt auth token is as easy as entering the code snippet below. We use a standard javascript function as opposed to an arrow function so that we can bind the 'this' keyword to the user object.

```
const jwt = require('jsonwebtoken');

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};
```
*Notice that we used return twice. This lets us use .then() in the file we call the function from to return the token.*

We can then update our POST /users request.

```
// Post /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => res.status(400).send(e));
});
```

Next, we're gonna define another method which prevents the password and tokens array being sent back to the user.

```
const _ = require('lodash');

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

```

Now we are done! The API knows how to sign up users and send back an authentication token as an http header.

### Private Routes
Find by Token - we create a new model method (as opposed to an instance method) to verify a user. To decode, we have to use the same salt we used to encode the object, here the salt is simply 'abc123'.
```
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123')
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
```
In the server.js file, we take the x-auth token from the req.header and pass it into the model method. The model methods verifies the token using the salt. If the token is verified, but couldn't find a user associated with that token, we run the if (!user) method to send back a status of 401, as we did with an invalid token.
```
app.get('/users/me', (req, res) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        res.send(user);
    }).catch((e) => {
        res.status(401).send();
    });
});
```

We can break this out into its own function, and its own file. We still have the exact same functionality, but we have a reusable function that we can use over and over again.

```
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};  

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});
```