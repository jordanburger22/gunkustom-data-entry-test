const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const ar15GripRouter = require('./routes/ar15/ar-15-grip-router');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();

app.use('/ar15/grips', ar15GripRouter)


app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        res.status(err.status);
    }
    return res.send({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});