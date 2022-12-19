const mongoose = require('mongoose');

module.exports = async (URI) => {
  if(!URI) throw new Error("No URI provided for database connection!")

  mongoose.set('strictQuery', false);
  await mongoose.connect(URI);
  
  console.log("Database connection established!")
}