const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);

module.exports = app;
