import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.getBalance = function () {
        var _this = this;
        var resourceRequest = new WLResourceRequest("/adapters/ResourceAdapter/balance", WLResourceRequest.GET);
        resourceRequest.send().then(function (response) {
            _this.balance = response.responseText;
            console.log(_this.balance);
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
    ];
    return HomePage;
}());
//# sourceMappingURL=home.js.map