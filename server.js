var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var MongoClient = require("mongodb").MongoClient;

let db;

MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true }, (err, con) => {
    if (err) throw err;
    db = con.db("fb");

    http.listen(80, function(){
        console.log("server started");
    });
})


app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.get('/register', function(req, res){
    res.sendFile(__dirname + "/register.html");
})
app.get('/fb.js', function(req, res){
    res.sendFile(__dirname + "/fb.js");
});

io.on('connection', function(socket){
    socket.on("register", (username, password, about)=>{
        db.collection("users").insertOne({username, password, about}, (err, res)=>{
            if (err) socket.emit("register_fail");
            else socket.emit("register_success");
        })
    })
});