import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskOverviewComponent } from './components/task-overview/task-overview.component';
import { SharedModule } from '../shared/shared.module';
import { TaskRoutingModule } from './task-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    LayoutModule,
    FontAwesomeModule,
  ],
  declarations: [
    TaskOverviewComponent,
    TaskComponent
  ]
})
export class TaskModule { }
