import { Injectable } from '@angular/core';
import { Register } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { NavController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataScanService {

  savedRecords:Register[]=[];
  
  constructor(private storage: Storage,
              private nvCtrl:NavController,
              private iab: InAppBrowser,
              public toastController: ToastController,
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
        message: 'Do you want to delete the history',
        color:'primary',
        position:'middle',
        buttons: [
          {
            icon: 'trash-outline',
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
    }
  }

  onOpenHistorial(registers:Register){
      const  browser = this.iab.create(registers.text,'_system')
      browser.show;
      return;
    
  }

  


}
