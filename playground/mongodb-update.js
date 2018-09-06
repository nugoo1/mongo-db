// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server', err)
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // findOneAndUpdate()
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b8f82bb0f59f61c2c8feab6')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

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

    // client.close();
});