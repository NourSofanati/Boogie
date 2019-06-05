const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let port = 550;
app.use(express.static('public'));
http.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
io.on('connection', function (player) {
    console.log(player.id + ' has connected')
    player.on('disconnect', () => {
        console.log(player.id + ' has disconnected')

    });

});
