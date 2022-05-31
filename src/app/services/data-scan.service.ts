import { Injectable } from '@angular/core';
import { Register } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class DataScanService {

  savedRecords:Register[]=[];


  constructor() { }

  keepRecords(format:string, text:string){
    const newRegister = new Register(format,text);
    this.savedRecords.unshift(newRegister);//save sacan for order
    console.log(this.savedRecords);
    
  }
}
