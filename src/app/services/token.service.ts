import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  save(token: string){
    setCookie('mt-todo-app-token', token, {expires: 365, path: '/'});
  }

  get(){
    const token = getCookie('mt-todo-app-token');

    return token;
  }

  remove(){
    removeCookie('mt-todo-app-token');
  }
}
