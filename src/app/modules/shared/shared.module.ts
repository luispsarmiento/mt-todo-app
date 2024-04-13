import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './components/btn/btn.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BtnComponent],
  exports: [BtnComponent]
})
export class SharedModule { }
