const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 9000;
const DB = process.env.MONGODB_URI;

// database connection
mongoose
.connect(DB)
.then(() => console.log('connected')) 

// console.log({mongodbUrl: process.env.MONGODB_URI})

// server 
const server = app.listen(port, () => {
    console.log(`server listen on ${port}...` )
})

 
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
});
  