const mongoose = require('mongoose');
const dbConnectionLink = process.env.DBPASSWORD;

mongoose.connect(dbConnectionLink, {
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
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// person's model
module.exports = mongoose.model('Person', personSchema);

