var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8081);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('e', function (data) {
    console.log(data);
  });
  var tweet = {user : "nodesource", text:"Yo"};
  var interval = setInterval(function() {
    socket.emit("tweet", tweet);}, 1000);
  socket.on("disconnect", function() {
    clearInterval(interval);

  });
  socket.on("tweet", function(tweet) {
    console.log(tweet);
  });

  });