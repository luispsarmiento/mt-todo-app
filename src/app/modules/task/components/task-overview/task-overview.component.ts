import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: []
})
export class TaskOverviewComponent implements OnInit {

  tasks: Array<any> = [
    
  ];

  isInputValid: boolean = true;

  constructor(
    
  ) { }

  ngOnInit() {
  }

  addTask(newTaskBox: any){
    const _newTaskName = newTaskBox.value;

    if (_newTaskName && this.isInputValid){
      this.tasks.push({
        title: _newTaskName
      });

      newTaskBox.value = '';
    }
  }

  validateInput(_newTaskName: string){
    if (_newTaskName.length >= 80){
      this.isInputValid = false;
    } else {
      this.isInputValid = true;
    }
  }
}
