import { Component} from '@angular/core';
import { DataScanService } from '../../services/data-scan.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { Register } from 'src/app/models/registro';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  historial:Register[]=[];

  constructor( public dataScan:DataScanService, 
               private iab: InAppBrowser,
               private platform: Platform,
  ) {}
  
  onSendEmail(){
    console.log("sending email....");
  }

  onOpenHistorial(registers:Register){
    if (this.platform.is('android') || this.platform.is('ios')) {
      const  browser = this.iab.create(registers.text)
      browser.show;
      return;
    }
    window.open(registers.text,'_blank')
    
  }

  onDelete(){
    this.dataScan.delete();
  }
}
