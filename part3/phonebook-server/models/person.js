const mongoose = require('mongoose');
const dbConnectionLink = process.env.DBPASSWORD;
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(dbConnectionLink, {
  useCreateIndex: true,  // get rid of the collection.ensureIndex is deprecated warning
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
.then(result => {
  console.log('connected to MongoDB');
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message);
});

// person's schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    unique: false,
    required: true,
  },
});

// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

// person's model
module.exports = mongoose.model('Person', personSchema);

