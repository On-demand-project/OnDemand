require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const service = require('./routes/service');
 

const app = express();
const PORT = 8000;
const http = require('http').createServer(app)
const io = require('socket.io')(http,{
    cors: {
      origin: '*',
    }
  });
      

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


const DBName = `ondemand`;
 mongoose.connect(process.env.MONGODB_TOKEN, {
   // mongoose.connect(`mongodb+srv:, {
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
let users={};
io.on('connection', socket => {
  console.log("Socket id------>"+socket.id);
  socket.on('new',(data)=>{
    users[data.username] =socket.id;
    console.log(users);
  })
    socket.on('message', ({ to,from, message }) => {
      io.to(users[to]).emit('message', { to,from, message })
      io.to(users[from]).emit('message', { to,from, message })
    })
  })


http.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);
