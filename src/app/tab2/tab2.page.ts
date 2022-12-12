import { Component, OnInit, NgZone } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  getLottoNumber = '';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private roleService: RoleService
  ) {}

  ionViewDidEnter() {
  }

  async goLotto(){
    if($("#lotto").val() === ''){
      alert('번호 입력하셔야쥬!')
    }else{
      let drwNo = $("#lotto").val();
    /*   const params = {
        drwNo: lotto
      }; */

      const res = await this.roleService.goLottoSearch(Number(drwNo));
      console.log(res);

    }

  }



}
