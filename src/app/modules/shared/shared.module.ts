import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './components/btn/btn.component';
import { ToastComponent } from './components/toast/toast.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BtnComponent, ToastComponent],
  exports: [BtnComponent, ToastComponent]
})
export class SharedModule { }
