import { Component, OnInit } from '@angular/core';
import { DataScanService } from '../../services/data-scan.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( public dataScan:DataScanService, ) {}
  
  onSendEmail(){
    console.log("sending email....");
  }

  onOpenHistorial(registers){
    console.log("registro", registers);
    
  }

  onDelete(){
    this.dataScan.delete();
  }
}
