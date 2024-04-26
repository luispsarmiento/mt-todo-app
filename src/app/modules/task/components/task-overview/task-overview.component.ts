import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { ToastService } from 'src/app/services/toast.service';

const STATUS_COMPLETED = 'completed';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: []
})
export class TaskOverviewComponent implements OnInit {

  readonly STATUS_COMPLETED = STATUS_COMPLETED;

  isInputValid: boolean = true;

  constructor(
    private taskService: TaskService
  ) {

  }

  tasks$: any;

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$
  }

  addTask(newTaskBox: any){
    const _newTaskName = newTaskBox.value;

    if (_newTaskName && this.isInputValid){
      let newTask: Task = {
        name: _newTaskName,
        isSync: false
      };
      
      this.taskService.add(newTask)

      newTaskBox.value = '';
    }
  }

  deleteTask(task: any){
    this.taskService.delete(task);
  }

  updateTask(task: any){
    this.taskService.update(task);
  }

  validateInput(_newTaskName: string){
    if (_newTaskName.length >= 80){
      this.isInputValid = false;
    } else {
      this.isInputValid = true;
    }
  }
}
