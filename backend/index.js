require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const service = require('./routes/service');
 

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


const DBName = `ondemand`;
// mongoose.connect(process.env.MONGODB_TOKEN, {
    mongoose.connect(`mongodb+srv://user:1234@cluster0.tr3cr.mongodb.net/ondemand?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use(logger);

app.use('/home', service);


app.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);