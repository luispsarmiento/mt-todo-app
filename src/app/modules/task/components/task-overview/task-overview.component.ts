import { Component, Input, OnInit, } from '@angular/core';
import { liveQuery } from 'dexie';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

const STATUS_COMPLETED = 'completed';
const STATUS_PENDING = 'pending'

export type TaskOverviewFilter = 'MY_DAY' | 'ALL'

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: []
})
export class TaskOverviewComponent implements OnInit {

  @Input()
  filter: TaskOverviewFilter = 'ALL';

  readonly STATUS_COMPLETED = STATUS_COMPLETED;
  readonly STATUS_PENDING = STATUS_PENDING;

  isInputValid: boolean = true;
  isSidebarOpen: boolean = false;
  taskSelected!: Task

  private myDayFilterFromDate!: string;
  private myDayFilterToDate!: string;

  constructor(
    private taskService: TaskService
  ) {
    
  }

  tasks$: any;

  ngOnInit() {
    this.setMyDayFilterDate();
    this.taskService.get();
    console.log(new Date())
    switch(this.filter){
      case 'ALL':
        this.tasks$ = liveQuery(() => this.taskService.listTasks());
        break;
      case 'MY_DAY':
        this.tasks$ = liveQuery(() => this.taskService.listBySchudeledDate(this.myDayFilterFromDate, this.myDayFilterToDate));
        break;
    }
  }

  addTask(newTaskBox: any){
    const _newTaskName = newTaskBox.value;

    if (_newTaskName && this.isInputValid){
      let newTask: Task = {
        name: _newTaskName,
        priority: 0,
        status: 'pending',
        isSync: false,
        isDeleted: false
      };
      
      this.taskService.add(newTask)

      newTaskBox.value = '';
    }
  }

  deleteTask(task: any){
    this.taskService.delete(task);
  }

  updateTaskStatus(task: Task){
    if(task.status == STATUS_COMPLETED){
      task.completedDate = (new Date()).toISOString().replace("T", ' ').substring(0, 19);
    } else if (task.status == STATUS_PENDING){
      task.completedDate = "1970-01-01 00:00:00";
    }
    this.taskService.update(task);
  }

  updateTask(task: Task){
    console.log(task);
    this.taskService.update(task);
  }

  validateInput(_newTaskName: string){
    if (_newTaskName.length >= 80){
      this.isInputValid = false;
    } else {
      this.isInputValid = true;
    }
  }

  selectTask(task: Task){
    this.taskSelected = task;
  }

  private setMyDayFilterDate(){
    let now = new Date();
    this.myDayFilterFromDate = new Date(now.getFullYear(), now.getMonth(), now.getDay()).toISOString();
    this.myDayFilterFromDate = new Date(now.getFullYear(), now.getMonth(), now.getDay(), 23, 59, 59).toISOString();
  }
}
