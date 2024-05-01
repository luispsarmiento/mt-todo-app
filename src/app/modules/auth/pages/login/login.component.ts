import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  keyPhrase: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit($evt: any){
    this.authService.loginByKey($evt.value.keyPhrase).subscribe({
      next: (resp: any) => {
        this.router.navigate(['/app']);
      },
      error: (err: any) => console.error(err)
    })
  }
}
