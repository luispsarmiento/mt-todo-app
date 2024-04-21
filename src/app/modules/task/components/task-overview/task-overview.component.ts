import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: []
})
export class TaskOverviewComponent implements OnInit {

  /*tasks: Array<any> = [
    
  ];*/

  isInputValid: boolean = true;

  constructor(
    private db: DbService
  ) { }

  tasks$ = liveQuery(() => this.listTasks());

  async listTasks() {
    return await this.db.find('Task')
      /*.where({
        todoListId: this.todoList.id,
      })
      .toArray();*/
  }

  ngOnInit() {
  }

  addTask(newTaskBox: any){
    const _newTaskName = newTaskBox.value;

    if (_newTaskName && this.isInputValid){
      /*this.tasks.push({
        title: _newTaskName
      });*/

      this.db.add('Task', {
        title: _newTaskName
      })

      newTaskBox.value = '';
    }
  }

  deleteTask(task: any){
    this.db.delete('Task', task.id)
  }

  updateTask(task: any){
    this.db.update('Task', task.id, task)
  }

  validateInput(_newTaskName: string){
    if (_newTaskName.length >= 80){
      this.isInputValid = false;
    } else {
      this.isInputValid = true;
    }
  }
}
