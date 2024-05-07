import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map } from 'rxjs';
import { HttpResponse } from '../models/http.model';
import { checkToken } from '../interceptors/token.interceptor';
import { LoaderService } from './loader.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService extends HttpService {
  readonly worker: Worker | undefined;

  readonly endpoint = "/tasks"

  private syncQueue: Array<any> = [];

  constructor(
    private db: DbService,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    super();
    if ( typeof Worker !== 'undefined' ){
      this.worker = new Worker(new URL('../workers/sync.worker', import.meta.url), { type: 'module' });
    
      this.worker.onmessage = ({data}) => {
        if (data === 'sync-tasks'){
          this.sync();
        }
      }
    } else {
      console.error('Web Workers are not supported in this environment.');
    }
  }

  requestSync(command: 'sync-tasks'){
    this.worker?.postMessage(command);
  }

  private async sync() {
    let tasks: Array<Task> | undefined = [];

    const query = (await this.db.find('Task')) as Array<Task>;
    
    tasks = query.filter(t => !t.isSync);

    if (typeof tasks !== 'undefined'){
      console.info("Syncing...");
      this.loaderService.show();
      this.syncQueue = [];
      for(let task of tasks){
        const data = {
          name: task.name,
          schudeledDate: task.schudeledDate,
          //status: task.status,
          completedDate: task.completedDate,
        };

        this.syncQueue.push(this.http.post<HttpResponse<{_id: string}>>(`${environment.baseUrl}${this.endpoint}`, data, {context: checkToken()})
        .pipe(
          map((res: HttpResponse<{_id: string}>) => {
            let _task = {...task, _id: res.data._id, isSync: true};

            this.db.update('Task', _task.id, _task);
          }),
          catchError(this.handleError)
        ));
        
      }

      await forkJoin(this.syncQueue).toPromise().catch(err => {});

      this.syncQueue = [];
      this.loaderService.close();
    }
  }

}
