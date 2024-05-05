import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  faSun, 
  faCalendar,
  faCircleExclamation,
  faSquareCheck,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit {

  faSun = faSun;
  faCalendar = faCalendar;
  faCircleExclamation = faCircleExclamation;
  faSquareCheck = faSquareCheck;
  faBars = faBars;

  isOpen = false;
  constructor(
    private router: Router,
    private toast: ToastService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  test(){
    //this.toast.error('Hi!');
    //this.loader.show();
  }
}
