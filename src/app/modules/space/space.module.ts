import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceMenuComponent } from './components/space-menu/space-menu.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    OverlayModule,
    CdkAccordionModule,
    FormsModule
  ],
  declarations: [SpaceMenuComponent],
  exports: [SpaceMenuComponent]
})
export class SpaceModule { }
