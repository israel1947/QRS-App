import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { DataScanService } from 'src/app/services/data-scan.service';
import { ClipboardService } from 'ngx-clipboard'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  image:string='assets/icon-wifi.png'
  text: string;
  isCopied1: boolean;
  icon:string='copy-outline';
  color:string ='primary';
  message:string='Copy'

  constructor(  private modalCtrl: ModalController,
                public dataScan:DataScanService,
                private _clipboardService: ClipboardService,
  ) { }

  ngOnInit() {
    this._clipboardService.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
          this.icon ='checkmark-outline';
          this.color= 'success';
          this.message = 'Copied';
      }
    });
  }

  onCopyFailure() { 
    this.message ='could not copy';
    this.color= 'danger';
    this.icon ='close-circle-outline';
  }

  onModalClose(){
    this.modalCtrl.dismiss();
  }
}
