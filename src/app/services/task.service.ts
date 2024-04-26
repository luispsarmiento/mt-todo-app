import { Injectable } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { liveQuery } from 'dexie';
import { HttpErrorHandler } from '../models/error.model';
import { SyncService } from './sync.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(
    private db: DbService,
    private sync: SyncService
  ) {

  }

  tasks$ = liveQuery(() => this.listTasks());

  async listTasks() {
    return await this.find();
      /*.where({
        todoListId: this.todoList.id,
      })
      .toArray();*/
  }

  async find(){
    return await this.db.find('Task');
  }

  add(task: Task) {
    this.db.add('Task', task);
    this.sync.requestSync("sync-tasks");
  }

  delete(task: Task) {
    this.db.delete('Task', task.id);
    this.sync.requestSync("sync-tasks");
  }

  update(task: Task) {
    this.db.update('Task', task.id, task);
    this.sync.requestSync("sync-tasks");
  }
}
