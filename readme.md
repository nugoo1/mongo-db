# MongoDB

![MongoDB](https://webassets.mongodb.com/_com_assets/cms/MongoDB-Logo-5c3a7405a85675366beb3a5ec4c032348c390b3f142f5e6dddf1d78e2df5cb5c.png)

## Prerequisites

### Installing MongoDB

Install <a href="https://www.mongodb.com/">MongoDB</a> from this URL.

Once you have MongoDB installed, from your terminal, navigate to the directory where you downloaded and installed MongoDB, and open up the bin folder.
Here, you have access to the MongoDB database. 

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
![deleteMany](https://github.com/nugoo1/mongo-db/blob/master/deleteMany.PNG)

deleteOne():
```
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });
```
![deleteOne](https://github.com/nugoo1/mongo-db/blob/master/deleteOne.PNG)

findOneAndDelete():
```
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });
```

*This function shows you the document that was deleted. Printing the two functions deleteMany() and deleteOne() using console.log isn't as useful, so you can alternatively leave out the .then() callback.*

![findOneAndDelete](https://github.com/nugoo1/mongo-db/blob/master/findOneAndDelete.PNG)
