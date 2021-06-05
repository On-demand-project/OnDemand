require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const service = require('./routes/service');
const jwt = require("jsonwebtoken");

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




io.use(function(socket, next){
  console.log("From socketio -- "+socket.handshake.query.token)
  if (socket.handshake.query && socket.handshake.query.token){

    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function(err, decoded) {
      if (err){console.log(err); return next(new Error('Authentication error'));}
      socket.decoded = decoded;
      console.log("Decode"+socket.decoded)
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }    
}).on('connection', socket => {
  // io.use((socket, next) => {
  //   const username = socket.handshake.auth.username;
  //   console.log("From sockets===========>" + socket.handshake.auth);
  //   if (!username) {
  //     return next(new Error("invalid username"));
  //   }
  //   socket.username = username;
  //   next();
  // });

  socket.on('message', ({ message }) => {
    io.emit('message', { message })
  })
  socket.on('private', (message ) => {
    console.log(message)
    io.emit('private',  message )
  })
  console.log("------------------------------")

})

http.listen(process.env.PORT || PORT, () =>
    console.log(`Server is running on port ${PORT}`)
);















// const http = require('http');
// const server = http.createServer(app);
// const io = socketio(server);


    // Handle chat event
    
        // socket.on("private message", (msg, anotherSocketId) => {
        //   socket.to(anotherSocketId).emit("private message", socket.id, msg);
        // });
      
      
    // socket.on('chat', function(data){
    //     console.log(data);
    //     io.sockets.emit('chat', data);
    // });

    // Handle typing event
    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing',socket.id, data);
    // });













// const httpServer = require("http").createServer(server);
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: '*',
//     methods: "GET"
//   }
// });


// var io = socket(server);