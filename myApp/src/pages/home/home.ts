import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var WLResourceRequest;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

balance;

  constructor(public navCtrl: NavController) {

    
    
  }

  getBalance(){
    var resourceRequest = new WLResourceRequest("/adapters/ResourceAdapter/balance",WLResourceRequest.GET);

    resourceRequest.send().then((response) => {
        this.balance = response.responseText;
        console.log(this.balance);
    },
    function(error){
        console.log(error);
    });
}

}
