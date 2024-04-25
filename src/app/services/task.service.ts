import { Injectable } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { liveQuery } from 'dexie';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpErrorHandler } from '../models/error.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly endpoint = "/tasks"
  
  constructor(
    private db: DbService,
    private httpClient: HttpClient
  ) {

  }

  tasks$ = liveQuery(() => this.listTasks());

  async listTasks() {
    return await this.db.find('Task')
      /*.where({
        todoListId: this.todoList.id,
      })
      .toArray();*/
  }

  add(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${environment.baseUrl}${this.endpoint}`, task)
                          .pipe(
                            map((res: Task) => {
                              let _task = {...task, id: res.id};
                              this.localSave('update', res);
                              return res;
                            }),
                            catchError(this.handleError));

    //this.db.add('Task', task)
  }

  delete(task: Task) {
    
  }

  update(task: Task) {
    
  }

  private handleError(err: HttpErrorResponse){
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorHandler: HttpErrorHandler = {
      type: 'on-server',
    };
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorHandler.type = 'on-client';
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    errorHandler.errorMessage = errorMessage;
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public localSave(action: 'add' | 'update' | 'delete' | 'find', task: Task) {
    switch(action) {
      case 'add':
        this.db.add('Task', task);
        break;
      case 'update':
        this.db.update('Task', task.id, task);
        break;
      case 'delete':
        this.delete(task);
        break;
      case 'find':
        this.db.find('Task');
        break;
    }
  }
}
