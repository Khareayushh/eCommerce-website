const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const router = express.Router();
const cors = require("cors");
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected to the Database');
})
.catch((error)=>{
    console.error('Error connecting to MongoDB:', error.message);
})

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.status(200).json("message");
})

app.use('/api/user', require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})