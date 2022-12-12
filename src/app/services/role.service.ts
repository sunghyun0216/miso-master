import { Injectable } from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  SUCCESS = 1;

  constructor(
    protected httpService: HttpService
  ) { }

  searchElementary(params: any) {
    return this.httpService.get(params);
  }

  goLottoSearch(drwNo: number) {
    console.log('drwNo : ', drwNo);
    return this.httpService.get({drwNo});
  }


}
