const express = require('express');
var unirest = require("unirest");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let port = 550;
app.use(express.static('public'));
http.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
var latestSong = "NONONONONONO";
io.on('connection', function (player) {
    console.log(player.id + ' has connected')
    player.on('disconnect', () => {
        console.log(player.id + ' has disconnected')
    });
    player.on('joined', data => {
        io.emit('joined', data);
    })
    player.on('message', data => {
        let newData = JSON.parse(data);
        let msg = newData.msg;
        if (msg == "!n") {
            let link;
            var req = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/playlist/1313621735");
            req.headers({
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "epKRh3U4VEmshtTMlMl0V98ulwYjp1ayryGjsnhtqnT9aeyXs3"
            });
            req.end(function (res) {
                if (res.error) throw new Error(res.error);
                let randomChoice = Math.floor(Math.random() * 25);
                console.log(`${res.body.tracks.data[randomChoice].title} - ${res.body.tracks.data[randomChoice].artist.name}`);
                latestSong = res.body.tracks.data[randomChoice].title;
                link = res.body.tracks.data[randomChoice].preview;
                io.emit('newMusicLink', link);
            });


        }

        if (msg.trim().toUpperCase() == latestSong.trim().toUpperCase()) {
            console.log(`${newData.username} is correct! the answer is ${latestSong}`);
            io.emit('message', JSON.stringify({
                username: "Server",
                msg: `${newData.username} is correct!`,
                background: "green"
            }))
        } else {
            io.emit('message', data);
        }

        console.log(player.id + ' : ' + data);
    })
});