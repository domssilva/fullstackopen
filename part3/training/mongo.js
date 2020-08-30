const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('please provide the password as an argument: node mongo.js <password>');
  process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.lg6qa.mongodb.net/node-app?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

// define schema: how the note object should be stored in the db
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

// define the model name
const Note = mongoose.model('Note', noteSchema);

// creating note object
const note = new Note({
  content: 'HTML is easy',
  date: new Date(),
  important: true,
});

/* 
// save object to db
note
  .save()
  .then(result => {
    // event handler automatically closes db connection 
    console.log('note saved!');
    mongoose.connection.close();
  });
*/

// fetching objects
Note
  .find({})
  .then(result => {
    result.forEach(note => {
      console.log(note);
    });

    mongoose.connection.close();
  });

