require('dotenv').config();
const mongoose = require('mongoose');

const checkConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

checkConnection(); 