import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { 
  faSquare,
  faSquareCheck,
  faTrash,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: []
})
export class TaskComponent implements OnInit {
  faPlay = faPlay;
  faPause = faPause;

  @Input()
  title = '';

  @Input()
  isDone: boolean = false;

  @Input()
  task!: Task;

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

  focusTimer: any;

  private timerSubs!: Subscription;
  elapsedFocustimer: string = '0:00';

  private timer: number = 0;

  constructor() { }

  onMouseEnter(){
    this.icon = this.faSquareCheck;
  }

  onMouseLeave() {
    this.icon = this.faSquare
  }

  ngOnInit() {
    this.setFocusTimer();
    this.task.isTimerRunning = false;
  }

  ngOnDestroy() {
    this.stopTimeCounter();
  }

  toggleTimer(task: Task) {
    const now = new Date().toISOString();
    
    if (!task.startDate) {
      // Start new timer
      task.startDate = now;
      task.isTimerRunning = true;
      this.startTimeCounter();
    } else if (task.isTimerRunning) {
      // Pause timer
      task.breakDate = now;
      task.isTimerRunning = false;
      this.stopTimeCounter();
    } else {
      // Resume timer
      task.breakDate = null;
      task.isTimerRunning = true;
      this.startTimeCounter();
    }
  }

  startTimeCounter() {
    this.stopTimeCounter();
    this.timerSubs = interval(1000).subscribe(() => {
      if (this.task?.isTimerRunning && this.task?.startDate) {
        this.elapsedFocustimer = this.getElapsedTime();
      }
    });
  }

  stopTimeCounter(){
    if (this.timerSubs) {
      this.timerSubs.unsubscribe();
    }
  }

  getElapsedTime(): string {
    this.timer += 1;

    const minutes = Math.floor(this.timer / 60);
    const seconds = Math.floor((this.timer % 60));

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  setFocusTimer(){
    const seconds = Math.floor((this.task.focusTimer || 0) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    this.focusTimer = {
      seconds: seconds % 60,
      minutes: minutes % 60,
      hours: hours
    };
  }
}
