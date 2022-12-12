import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { Stepcounter } from '@ionic-native/stepcounter/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private inAppBrowser: InAppBrowser,
    private platform: Platform
  ) {
    //this.initializeApp();
  }

  /* initializeApp() {
    this.platform.ready().then(() => {
          // let url = encodeURI('http://www.misoinfo.co.kr/#/misoinfo/index.do');
          let url = environment.host;
          this.inAppBrowser.create(url, '_self', 'location=no');
      });
  } */
}
