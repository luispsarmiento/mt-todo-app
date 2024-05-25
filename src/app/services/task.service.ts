import { Injectable } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { liveQuery } from 'dexie';
import { HttpErrorHandler } from '../models/http.model';
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

  //tasks$ = liveQuery(() => this.listTasks());

  async listTasks() {
    return (await this.find()).filter(e => !e.isDeleted);
      /*.where({
        todoListId: this.todoList.id,
      })
      .toArray();*/
  }

  async listBySchudeledDate(fromDate: string, toDate: string) {
    return (await this.find()).filter((e: Task) => {
      if (!e.scheduledDate){
        return false;
      }

      const sd = new Date(e.scheduledDate);
      const _fromDate = new Date(fromDate);
      const _toDate = new Date(toDate);

      if (!e.isDeleted && sd.getTime() != 0 && _fromDate.getTime() <= sd.getTime() && sd.getTime() <= _toDate.getTime()){
        return true;
      }

      return false;
    });
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
    task.isDeleted = true;
    task.isSync = false;
    this.db.update('Task', task.id, task);
    this.sync.requestSync("sync-tasks");
  }

  update(task: Task) {
    task.isSync = false;
    this.db.update('Task', task.id, task);
    this.sync.requestSync("sync-tasks");
  }

  get(){
    this.sync.syncGet().subscribe();
  }
}
