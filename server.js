const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tasks");
const Task = require('./models/Task');


const app = express();
app.use(cors());
app.use(express.json());

// Function to connect to the database
const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Database connected successfully');
    } catch (err) {
      console.log('Database connection error:', err);
    }
  };
  connectToDatabase()



//   Update Your API Endpoints:
 app.use("/", authRouter )
 app.use("/", taskRouter )






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

