// const express= require('express');
// const path = require('path');
// const http = require('http').Server(express);
// const io = require('socket.io')(http);
//
// const port = 3000;
//
// app = express();
//
// app.use(express.static(path.join(__dirname, '')));
//
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', (socket) => {
//   console.log('user connected');
// });
//
// http.listen(port, ()=>{
//   console.log('Server listening on', port);
// });

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.static(__dirname + '/pg'));


function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, function(){
  console.log('listening on port', port);
});
