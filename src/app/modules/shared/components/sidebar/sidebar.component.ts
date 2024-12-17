import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { faClose, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  faClose = faClose;
  faSun = faSun;

  @ViewChild('mtOverlay') mtOverlay!: ElementRef;

  @Input() isOpen!: boolean;

  _taskDetail!: Task;
  @Input() 
  set taskDetail(v: Task){
    this._taskDetail = v;
    this.textareaContent = this._taskDetail.notes ?? "";
  }
  
  @Output()
  onClose = new EventEmitter();

  @Output()
  onChangeTaskDetail = new EventEmitter<Task>();

  isEditing = false;
  inputNameHasFocus = false;

  isSaveTaskNameByBlur = false;
  isSaveTaskNameByEnter = false;
  wait!: any;

  textareaContent = "";

  isAddedToMyDay: boolean = false;

  private myDayFilterFromDate!: string;
  private myDayFilterToDate!: string;

  constructor(private eRef: ElementRef) {}

  ngOnDestroy(): void {
    clearTimeout(this.wait);
  }

  ngOnInit() {
    this.onChangeTaskDetail.subscribe(_v => {
      this.isSaveTaskNameByEnter = false;
      this.isSaveTaskNameByBlur = false;
      clearTimeout(this.wait);
    });
    this.setMyDayFilterDate();
    //if the scheduledDate is equel to now, so the task is added to "My Day"
    if (this._taskDetail.scheduledDate != null || this._taskDetail.scheduledDate != undefined){
      const sd = new Date(this._taskDetail.scheduledDate);
      const _fromDate = new Date(this.myDayFilterFromDate);
      const _toDate = new Date(this.myDayFilterToDate);

      this.isAddedToMyDay = _fromDate.getTime() <= sd.getTime() && sd.getTime() <= _toDate.getTime();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (this.isOpen && !this.mtOverlay.nativeElement.contains(event.target)) {
      this.onClose.emit();
    }
  }

  saveTaskNameByBlur(event: Event){
    if(!this.isSaveTaskNameByEnter){
      console.warn("guardado desde blur")
      this.isSaveTaskNameByBlur = true;
      this.saveTaskName(event);
    }
  }

  saveTaskNameByEnter(event: Event){
    if(!this.isSaveTaskNameByBlur){
      console.warn("guardado desde enter")
      this.isSaveTaskNameByEnter = true;
      this.saveTaskName(event);
    }
  }

  onTextareaChange() {
    this._taskDetail.notes = this.textareaContent;
    this.onChangeTaskDetail.emit(this._taskDetail);
  }

  addToMyDay(isAdded: boolean){
    this._taskDetail.scheduledDate = isAdded ? new Date().toISOString() : null;
    this.isAddedToMyDay = !this.isAddedToMyDay
    this.onChangeTaskDetail.emit(this._taskDetail);
  }

  private saveTaskName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._taskDetail.name = inputElement.value;
    this.isEditing = false;
    this.wait = setTimeout(() => {
      this.onChangeTaskDetail.emit(this._taskDetail);
    }, 500);
  }

  private setMyDayFilterDate(){
    let now = new Date();
    this.myDayFilterFromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    this.myDayFilterToDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
  }
}
