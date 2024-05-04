import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse, HttpErrorHandler } from '../models/http.model';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { TokenService } from './token.service';
import { checkToken } from '../interceptors/token.interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly endpoint = "/auth"

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  loginByKey(key: string): Observable<any> {
    return this.httpClient.post<HttpResponse<{_id: string}>>(`${environment.baseUrl}${this.endpoint}`, {apiKey: key}, {context: checkToken()})
                          .pipe(tap((response: any) => {
                            this.tokenService.saveApiKey(key);
                            this.tokenService.save(response.apiKey);
                          }), catchError(this.handleError));
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
}
