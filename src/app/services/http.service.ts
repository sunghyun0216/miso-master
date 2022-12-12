import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { PayloadVO } from 'src/app/interfaces/payload-vo';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiHost = environment.apiHost;
  apiPort = environment.apiPort;

  SESSION_EXPIRED = 10;

  EVENT_CANCEL_FILE_UPLOAD = 'cancel_file_upload';

  pendingHTTPRequests = new Subject<void>();
  statusEvent = new EventEmitter();

  constructor(
    protected http: HttpClient,
    protected httpNative: HTTP
  ) { }

  async post(command: string, objParams: any, isFormData?: boolean): Promise<PayloadVO> {
    let params = null;
    console.log("http")

    for (const key in objParams) {
      if (objParams.hasOwnProperty(key)) {
        if (!isFormData) {
          params = params ? params : {};
          params[key] = objParams[key];
        } else {
          params = params ? params : new FormData();
          params.append(key, objParams[key]);
        }
      }
    }

    try {
      const response = await this.http.post(`${this.apiHost}:${this.apiPort}/${command}`,
        params, { observe: 'response' }).toPromise();

      if (!environment.production) console.log(command, params, response.body);

      return this.returnPayload(response);

    } catch (e) {
      return this.returnPayload(null);
    }
  }

 /* async get(command: string, objParams: any): Promise<PayloadVO> {
    console.log("http2", command, objParams);
    let input = new HttpParams();

     const option = {
       method: 'GET',
       uri: 'https://open.neis.go.kr/hub/schoolInfo' ,
          qs: {
              'Type' : 'json',
              'KEY' : 'e267fa4dd2594c4d9788de8ebe0303b5',
              'ATPT_OFCDC_SC_CODE' : 'J10',
              'SCHUL_NM' : '서초',
              'pIndex' : 1,
              'pSize' : 100,
              'SCHUL_KND_SC_NM' : '초등학교'
          }
    }

     const params = {
      'Type' : 'json',
      'KEY' : 'e267fa4dd2594c4d9788de8ebe0303b5',
      'ATPT_OFCDC_SC_CODE' : 'J10',
      'SCHUL_NM' : '서초',
      'pIndex' : 1,
      'pSize' : 100,
      'SCHUL_KND_SC_NM' : '초등학교'
    }

    const params = objParams

    console.log("params :", params);


     for (const key in objParams) {
      console.log("??", key);
      if (objParams.hasOwnProperty(key)) {
        input = input.append(key, objParams[key]);
        console.log('input : ', input);
      }
    }

    try {

       const response = await this.http.get(`https://www.dhlottery.co.kr/common.do?`, { params: params, observe: 'response' }).toPromise();

       // const response

       console.log("12345", response);


      if (!environment.production) console.log(command, input, response.body);

      return this.returnPayload(response);

    } catch (e) {
      return this.returnPayload(null);
    }
  }

 */



 async get(objParams: any): Promise<PayloadVO> {
   let input = new HttpParams();

   console.log('objParams : ', objParams);

   for (const key in objParams) {
     if (objParams.hasOwnProperty(key)) {
       input = input.append(key, objParams[key]);
       console.log(input);
     }
   }

   console.log('input12 : ', input);

   try {
     console.log("----------------");
     const response = await this.http.get(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber`, { params: objParams, observe: 'response' }).toPromise();
     console.log('response :', response);
     if (!environment.production) console.log(input, response.body);

     return this.returnPayload(response);

   } catch (e) {
     return this.returnPayload(null);
   }
 }













  upload(command: string, blob: Blob, filename: string) {
    const params = new FormData();

    params.append('postFile', blob, filename);

    console.log(command, blob, filename);

    return this.http.post(`${this.apiHost}:${this.apiPort}/${command}`, params, { observe: 'events', reportProgress: true });
  }


  // bookfiles api 보내기위한 bookUpload 로직
  bookUpload(command: string, blob: Blob, filename: string) {
    const params = new FormData();

    params.append('bookfiles', blob, filename);
    console.log(command, blob, filename);

    return this.http.post(`${this.apiHost}:${this.apiPort}/${command}`, params, { observe: 'events', reportProgress: true });
  }

  returnPayload(response: HttpResponse<object>): PayloadVO {
    const result = {
      url: response ? response.url : '',
      sessiontoken: response ? response.headers.get('Authorization') : null,
      // tslint:disable-next-line:no-string-literal
      status: response && response.body.hasOwnProperty('status') ? response.body['status'] : 0,
      // tslint:disable-next-line:no-string-literal
      payload: response && response.body.hasOwnProperty('payload') ? response.body['payload'] : []
    };

    if (result.status === this.SESSION_EXPIRED) {
      sessionStorage.clear();
      localStorage.clear();
      alert('세션이 만료되었습니다<br>다시 로그인해주세요');
    }

    return result;
  }

}
