import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Space } from '../models/space.model';
import { checkToken } from '../interceptors/token.interceptor';
import { BehaviorSubject, catchError, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceService extends HttpService{

  readonly endpoint = "/spaces";

  private spacesSubject = new BehaviorSubject<Space[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<boolean>(false);
  private loaded = false;

  spaces$ = this.spacesSubject.asObservable().pipe(shareReplay(1));
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  loadSpaces(){
    if(!this.loaded){
      this.loadingSubject.next(true);
      this.errorSubject.next(false);

      this.httpClient.get<Space[]>(`${environment.baseUrl}${this.endpoint}`, {context: checkToken()}).pipe(
        tap(spaces => {
          this.spacesSubject.next(spaces);
          this.loadingSubject.next(false);
          this.loaded = true;
        }),
        catchError(error => {
          this.errorSubject.next(true);
          this.loadingSubject.next(false);
          throw error;
        })
      ).subscribe();
    }

    return this.spaces$;
  }
}
