var express = require('express')
var app = express()
const path = require('path')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var bodyParser=require('body-parser');
app.use(express.static(__dirname+'/public'))
var un;
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json())

app.post('/setname',function(req,res){
    un=req.body.user;
    console.log(un);
    res.send(null)
})

io.on('connection', function(socket){
    console.log('A user connected '+socket.id);

   socket.on('messagetoserver', function(msg){
    console.log("Received message: "+msg);
    io.emit('appendmessage', {msg:msg, id:socket.id,name: un});
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});