import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ClipboardModule,
    FormsModule
  ],
  exports:[
    ModalComponent
  ]
})
export class ComponentsModule { }
