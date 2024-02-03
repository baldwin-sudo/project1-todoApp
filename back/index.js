import express from 'express';
import session from "express-session";

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import crudRoutes from './routes/task.js';
import cors from'cors';
import cookieParser from "cookie-parser";
dotenv.config(); // Load environment variables from the .env file

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key", // Use a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (24 hours)
    },
  })
);

// Connection to database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Database is connected ...');
  })
  .catch(err => {
    console.log('Database failed to connect ...', err.name);
  });

// Routes :

// test
app.get("/",(req,res) =>{
  res.send("hello");
})
app.use("/auth",authRoutes);

app.use("/task",crudRoutes);
// API server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is Running on port: http://localhost:${PORT}`);
});
