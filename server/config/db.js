const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect('mongodb+srv://goyalmoney95:hI3UA69wbxff2NDk@cluster0.ex5u5nz.mongodb.net/blog');
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
