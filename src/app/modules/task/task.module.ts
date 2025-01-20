import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskComponent } from './components/task/task.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AllComponent } from './pages/all/all.component';
import { MyDayComponent } from './pages/my-day/my-day.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OverlayModule,
    CdkAccordionModule,
    FormsModule
  ],
  declarations: [
    TaskOverviewComponent,
    TaskComponent,
    AllComponent,
    MyDayComponent
  ]
})
export class TaskModule { }
