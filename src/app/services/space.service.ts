import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Space } from '../models/space.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class SpaceService extends HttpService{

  readonly endpoint = "/spaces";

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  listSpaces(){
    return this.httpClient.get<Space[]>(`${environment.baseUrl}${this.endpoint}`, {context: checkToken()});
  }
}
