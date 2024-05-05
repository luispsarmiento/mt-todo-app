import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  keyPhrase: string = "";

  isBtnDisabled: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaderService.close();
  }

  onSubmit($evt: any){
    this.loaderService.show();
    this.isBtnDisabled = true;
    this.authService.loginByKey($evt.value.keyPhrase).subscribe({
      next: (resp: any) => {
        this.loaderService.close();
        this.router.navigate(['/app']);
      },
      error: (err: any) => {
        this.loaderService.close();
        this.isBtnDisabled = false;
        console.error(err)
      }
    })
  }
}
