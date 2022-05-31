import { Injectable } from '@angular/core';
import { Register } from '../models/registro';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataScanService {

  savedRecords:Register[]=[];
  
  constructor(private storage: Storage,
              private nvCtrl:NavController,
              private iab: InAppBrowser,
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
    await this.storage.clear();
  }

  openRegister(register:Register){
    this.nvCtrl.navigateForward('/tabs/tab2');

    switch(register.type){
      case 'http':
        this.onOpenHistorial
        break;
    }
  }

  onOpenHistorial(registers:Register){
      const  browser = this.iab.create(registers.text)
      browser.show;
      return;
    
  }

  


}
