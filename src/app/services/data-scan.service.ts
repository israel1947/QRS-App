import { Injectable } from '@angular/core';
import { Register } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalComponent } from '../components/modal/modal.component';


@Injectable({
  providedIn: 'root'
})
export class DataScanService {

  savedRecords:Register[]=[];
  
  constructor(private storage: Storage,
              private nvCtrl:NavController,
              private iab: InAppBrowser,
              public toastController: ToastController,
              private modalCtrl: ModalController
  ) {this.loadHistorial();}


  async keepRecords(format:string, text:string){

    await this.loadHistorial();

    const newRegister = new Register(format,text);
    this.savedRecords.unshift(newRegister);//save sacan for order
    this.openRegister(newRegister);
    

    this.storage.set('registros', this.savedRecords);
  }

  async loadHistorial(){
    const storage = await this.storage.create();
    const historial = await this.storage.get('registros');
    this.savedRecords = historial || [];
  }

  async delete(){
      const toast = await this.toastController.create({
        message: 'Do you want to delete the history ?',
        buttons: [
          {
            text: 'Acept',
              handler: () => {
              this.storage.clear();
              this.nvCtrl.navigateForward('/tabs/tab1');
            }
          }, 
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]
      });
      await toast.present();
  }

  openRegister(register:Register){
    this.nvCtrl.navigateForward('/tabs/tab2');

    switch(register.type){
      case 'http':
        this.onOpenHistorial(register);
        break;
      case 'geo:':
        this.nvCtrl.navigateForward(`/tabs/tab2/map/${register.text}`)
        break;
      case 'WIFI':
        this.onOpenTypeWifi(register);
        break;
    }
  }

  onOpenHistorial(registers:Register){
      const  browser = this.iab.create(registers.text,'_system')
      browser.show;
      return;
  }

  async onOpenTypeWifi(registers:Register){
    const {text} = registers
    const modal = await this.modalCtrl.create({
      component:ModalComponent,
      showBackdrop: false,
      componentProps:{
        text
      }
    })
    modal.present();
    console.log(text);
    
  }

  


}
