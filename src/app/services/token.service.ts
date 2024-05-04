import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveApiKey(apiKey: string){
    setCookie('mt-todo-app-apiKey', apiKey, {expires: 365, path: '/'});
  }

  getApiKey(){
    const token = getCookie('mt-todo-app-apiKey');

    return token;
  }

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

  isValidToken(){
    const token = this.getApiKey();
    if (!token) {
      return false;
    } 

    const decodeExpToken = this.decodeExpToken(token);
    console.log("Decode token", decodeExpToken)
    if(decodeExpToken){
      //const tokenDate = new Date(0);
      //tokenDate.setUTCSeconds(decodeExpToken);
      const tokenDate = new Date(decodeExpToken);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }

    return false;
  }

  private decodeExpToken(token: string){
    console.log(token);
    const _decodeExptoken = atob(token.split('.')[1] ?? "").split('|')[1] ?? "";
    console.log(_decodeExptoken);
    return _decodeExptoken;
  }
}
