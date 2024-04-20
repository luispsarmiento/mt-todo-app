import { Component, Input, OnInit } from '@angular/core';
import { 
  faSquare,
  faSquareCheck
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: []
})
export class TaskComponent implements OnInit {

  @Input()
  title = '';

  faSquare = faSquare;
  faSquareCheck = faSquareCheck;
  icon = faSquare;

  isDone: boolean = false;

  constructor() { }

  onMouseEnter(){
    this.icon = this.faSquareCheck;
  }

  onMouseLeave() {
    this.icon = this.faSquare
  }

  ngOnInit() {
  }

}
