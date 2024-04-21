import { Injectable } from '@angular/core';
import { db } from './db';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { 
  }

  add(storeName: string, item: any) {
    db.table(storeName).add(item);
  }

  update(storeName: string, key: number, item: any) {
    db.table(storeName).put(item, key);
  }

  delete(storeName: string, key: number) {
    db.table(storeName).delete(key);
  }

  async find(storeName: string) {
    return await db.table(storeName).toArray();
  }
}

