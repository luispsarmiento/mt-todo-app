import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { 
  faSquare,
  faSquareCheck,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: []
})
export class TaskComponent implements OnInit {

  @Input()
  title = '';

  @Input()
  isDone: boolean = false;

  @Output()
  onDone = new EventEmitter();

  @Output()
  onDelete = new EventEmitter();

  @Output()
  onTaskClick = new EventEmitter();

  faSquare = faSquare;
  faSquareCheck = faSquareCheck;
  icon = faSquare;

  iconTrash = faTrash;
  iconTrashClassName: 'text-gray-700' | 'text-red-500' = 'text-gray-700';

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
