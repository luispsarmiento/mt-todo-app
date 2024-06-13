import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  faClose = faClose;

  @ViewChild('mtOverlay') mtOverlay!: ElementRef;

  @Input() isOpen!: boolean;

  _taskDetail!: Task;
  @Input() 
  set taskDetail(v: Task){
    console.log(v);
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
  }

  onBackdropClick(event: MouseEvent) {
    if (this.isOpen && !this.mtOverlay.nativeElement.contains(event.target)) {
      console.log("closing")
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

  addToMyDay(){
    this._taskDetail.scheduledDate = new Date().toISOString();
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
}
