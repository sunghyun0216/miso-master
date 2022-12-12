import { Component, OnInit, NgZone } from '@angular/core';
import { Stepcounter } from '@ionic-native/stepcounter/ngx';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {

  startingOffset: any;
  stepsCount: any;
  sec : any;

  constructor(
     private stepcounter: Stepcounter,
     private pedometer: Pedometer,
     private ngZone: NgZone,
     private router: Router,
     private roleService: RoleService
  ) {}

  ionViewDidEnter() {

  }

  goLotto(){
    let fir = new Array(45);
    let sec = new Array(6);
    for (let i = 0; i < 45; i++){
      fir[i] = i + 1;
    }

    for (let i = 0; i < 6; i++) {
    	let ran =  parseInt((Math.random()*fir.length).toFixed(0));
    		sec[i] = fir[ran];

    		fir.splice(ran,1); //뽑은 번호 지우기123
    		for (let h = fir.length; h; h -= 1) {
    			let j = Math.floor(Math.random() * h);
    			let x = fir[h - 1];
    			fir[h - 1] = fir[j];
    			fir[j] = x;
    		}
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j <= i; j++) {
    		if(sec[i] <= sec[j]) {
    			let	k = sec[i];
    				sec[i] = sec[j];
    				sec[j] = k;
    			}
    		}
    }

    console.log(sec);
    this.sec = sec;
  }

  async test2() {
    const params = {
       SC_CODE: 'J10',
       SCHUL_NM: '서초'
    };

    console.log("??", params);
    //const res = await this.roleService.searchElementary(params);
  }
}
