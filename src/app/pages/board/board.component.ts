import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';

import { Column, ToDo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ]
})
export class BoardComponent implements OnInit {

  columns: Column[] = [
    {
      title: 'To Do',
      todos: [
        {
          id: '1',
          title: 'Comer'
        }
      ]
    },
    {
      title: 'Doing',
      todos: [
        {
          id: '2',
          title: 'Dormir'
        }
      ]
    },
    {
      title: 'Done',
      todos: [
        {
          id: '3',
          title: 'Codear'
        }
      ]
    }
  ]
  tasks: ToDo[] = [];

  doing: ToDo[] = [];

  done: ToDo[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit() {
  }

  toDoListDropped($event: CdkDragDrop<ToDo[]>){
    if ($event.previousContainer === $event.container){
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }
  }

  addColumn() {
    this.columns.push({
      title: 'New Column',
      todos: [],
    });
  }

  openDialog(data: any) {
    const _dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth : '50%',
      data: {
        todo: data
      }
    });

    _dialogRef.closed.subscribe(result => {
      console.log(result);
    });
  }
}
