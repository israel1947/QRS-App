import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Register } from 'src/app/models/registro';
import { DataScanService } from 'src/app/services/data-scan.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  savedRecords:Register[]=[];
  image:string='assets/icon-wifi.png'

  constructor(  private modalCtrl: ModalController, public dataScan:DataScanService ) { }

  ngOnInit() {}


  onModalClose(){
    this.modalCtrl.dismiss();
  }

  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
