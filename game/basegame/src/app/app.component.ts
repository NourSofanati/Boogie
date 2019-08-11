  import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'Boogie';
  messages: Object[] = [];
  un;
  users: Object[] = [];
  socket;
  musiclink;
  chatwindow;
  constructor() {
    //this.musiclink = "https://cdns-preview-f.dzcdn.net/stream/c-fc08e720227ee09d910552e928b9a93b-3.mp3";
    //this.un = prompt("Please enter your username");
    this.un = "username";
    let data = { username: this.un };
    this.messages = [];
    this.socket = io("http://82.137.247.59:550");
    this.socket.emit('joined', JSON.stringify(data));
    this.socket.on('joined', data => {
      let newData = JSON.parse(data);
      this.users.push({ username: newData.username });
    })
    this.socket.on('message', data => { this.receiveMsg(data) });
    this.socket.on('newMusicLink', link => {
      this.musiclink = link;
    });

    window.onload = async () => {
      const form = document.querySelector('form');
      const chatInput = document.getElementById('chatmessage');
      this.chatwindow = document.getElementById('chatwindow');
      chatInput.onfocus = () => {
        form.classList.toggle('focused');
      }
      form.onsubmit = (e) => {
        e.preventDefault();
        var inputValue = (<HTMLInputElement>document.getElementById('chatmessage')).value;
        if (inputValue.trim() != '') {
          this.submitMessage(inputValue);
        }
        if (form.classList.contains('focused'))
          form.classList.toggle('focused');
        (<HTMLInputElement>document.getElementById('chatmessage')).value = '';
      }
      window.onclick = (e) => {
        if (e.target != chatInput) {
          if (form.classList.contains('focused')) {
            form.classList.toggle('focused');
          }
        }
      }
    }
  }
  receiveMsg(data) {
    console.log(data);
    let jsonData = JSON.parse(data);
    if (jsonData.background == "green") {
      this.messages.push({ username: jsonData.username, msg: jsonData.msg, background: jsonData.background });
    }
    else {
      this.messages.push({ username: jsonData.username, msg: jsonData.msg });
    }
    setTimeout(() => { this.chatwindow.scrollTo(0, this.chatwindow.scrollHeight) }, 10);
  }
  submitMessage(text) {

    let newText = {
      username: this.un,
      msg: text
    }
    this.socket.emit('message', JSON.stringify(newText));
  }
}


