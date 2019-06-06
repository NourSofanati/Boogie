import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export class ChatMessage {
  user: Profile;
  msg: String;
  date: Date;
  constructor(user: Profile, msg: String) {
    this.user = user;
    this.msg = msg;
    this.date = new Date();
  }
}

export class Profile {
  username: String;
  rank: Number;
  profile_avatar: Avatar;
  country_flag: String;
  score: Number;
  constructor(username: String, rank: Number, profile_avatar: Avatar, country_flag: String, score: Number) {
    this.username = username;
    this.rank = rank;
    this.profile_avatar = profile_avatar;
    this.country_flag = country_flag;
    this.score = score;
  }
}

export class Avatar {
  hat: Part;
  head: Part;
  eyes: Part;
  nose: Part;
  mouth: Part;
  gloves: Part;
  boots: Part;
  aura: [];
  constructor(args: Part[], aura: []) {
    this.hat = args[0];
    this.head = args[1];
    this.eyes = args[2];
    this.nose = args[3];
    this.mouth = args[4];
    this.gloves = args[5];
    this.boots = args[5];
    this.aura = aura;
  }
}

export class Part {
  partname: String;
  imgUrl: URL;
  constructor(partname: String, imgUrl: URL) {
    this.partname = partname;
    this.imgUrl = imgUrl;
  }
}