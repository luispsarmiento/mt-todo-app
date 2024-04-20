import { Component, OnInit } from '@angular/core';
import { 
  faSquare,
  faSquareCheck
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: []
})
export class TaskOverviewComponent implements OnInit {

  faSquare = faSquare;
  faSquareCheck = faSquareCheck;
  icon = faSquare;

  constructor(
    
  ) { }

  ngOnInit() {
  }

  onMouseEnter(){
    this.icon = this.faSquareCheck;
  }

  onMouseLeave() {
    this.icon = this.faSquare
  }
}
