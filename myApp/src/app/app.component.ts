import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { Component, Renderer } from '@angular/core';

declare var WL;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

AuthHandler: any;

  constructor(platform: Platform, public alertCtrl: AlertController, public renderer : Renderer) {
    renderer.listenGlobal('document', 'mfpjsloaded', () => {
        this.AuthInit();
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  AuthInit(){
    this.AuthHandler = WL.Client.createSecurityCheckChallengeHandler("UserLogin");
    this.AuthHandler.handleChallenge = ((response) =>{
        this.DisplayLogin();
    });    
}

  DisplayLogin(){
    let prompt = this.alertCtrl.create({
    title: 'Login',
    message: "Enter your username and password",
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type:'password'
      },
    ],
    buttons: [
      {
        text: 'Login',
        handler: data => {
          console.log('---> Trying to auth with user', data);
          this.AuthHandler.submitChallengeAnswer(data);
        }
      }
    ]
  });
  prompt.present();   
};


}
