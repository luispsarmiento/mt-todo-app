import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../models/http.model';
import { catchError, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { checkToken } from '../interceptors/token.interceptor';
import { Router } from '@angular/router';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  readonly endpoint = "/auth"

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    super();
  }

  refreshToken(key: string): Observable<any> {
    return this.httpClient.post<HttpResponse<{_id: string}>>(`${environment.baseUrl}${this.endpoint}/refresh-token`, {apiKey: key}, {context: checkToken()})
                          .pipe(tap((response: any) => {
                            this.tokenService.save(response.accessToken);
                            this.tokenService.saveRefreshToken(response.refreshToken);
                          }), catchError(this.handleError));
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<HttpResponse<{_id: string}>>(`${environment.baseUrl}${this.endpoint}`, {email: email, password: password}, {context: checkToken()})
                          .pipe(tap((response: any) => {
                            this.tokenService.save(response.accessToken);
                            this.tokenService.saveRefreshToken(response.refreshToken);
                          }), catchError(this.handleError));
  }

  logout(){
    this.tokenService.remove();

    this.router.navigate(['/login']);
  }
}
