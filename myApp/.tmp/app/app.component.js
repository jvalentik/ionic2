import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { Component, Renderer } from '@angular/core';
export var MyApp = (function () {
    function MyApp(platform, alertCtrl, renderer) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.renderer = renderer;
        this.rootPage = HomePage;
        renderer.listenGlobal('document', 'mfpjsloaded', function () {
            _this.AuthInit();
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    MyApp.prototype.AuthInit = function () {
        var _this = this;
        this.AuthHandler = WL.Client.createSecurityCheckChallengeHandler("UserLogin");
        this.AuthHandler.handleChallenge = (function (response) {
            _this.DisplayLogin();
        });
    };
    MyApp.prototype.DisplayLogin = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    type: 'password'
                },
            ],
            buttons: [
                {
                    text: 'Login',
                    handler: function (data) {
                        console.log('---> Trying to auth with user', data);
                        _this.AuthHandler.submitChallengeAnswer(data);
                    }
                }
            ]
        });
        prompt.present();
    };
    ;
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html'
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
        { type: AlertController, },
        { type: Renderer, },
    ];
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map