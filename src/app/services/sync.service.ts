import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('../workers/sync.worker'), { type: 'module' });
    this.worker.addEventListener('sync', this.onWorkerSync.bind(this));
  }

  private onWorkerSync(evt: any) {
    //if (evt.tag === 'my-tag-name') {
      evt.waitUntil(this.sync());
    //}
  }

  private sync() {
    console.log("Syncing...");
  }
}
