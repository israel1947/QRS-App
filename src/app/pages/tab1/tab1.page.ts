import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataScanService } from 'src/app/services/data-scan.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private barcodeScanner: BarcodeScanner,
              private dataScan:DataScanService
  ) {}

  ionViewWillEnter(){
    this.onClickScan();
  }

  onClickScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled){
        this.dataScan.keepRecords(barcodeData.format,barcodeData.text);
      }
     }).catch(err => {
        //this.dataScan.keepRecords('Qr format','https://www.instagram.com/israel_1947/');
        this.dataScan.keepRecords('Qr format','geo:40.73151796986687,-74.06087294062502');
         console.log('Error', err);
     });
  }
}
