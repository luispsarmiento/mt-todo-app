import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './components/btn/btn.component';
import { ToastComponent } from './components/toast/toast.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogBaseComponent } from './components/dialog-base/dialog-base.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DialogModule
  ],
  declarations: [BtnComponent, ToastComponent, SidebarComponent, DialogComponent, DialogBaseComponent],
  exports: [BtnComponent, ToastComponent, SidebarComponent, DialogComponent, DialogBaseComponent]
})
export class SharedModule { }
