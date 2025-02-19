import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import {
  faPlus,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-space-menu',
  templateUrl: './space-menu.component.html',
  styleUrls: ['./space-menu.component.css']
})
export class SpaceMenuComponent implements OnInit {
  faPlus = faPlus;
  faFolder = faFolder;

  constructor(
    private dialog: Dialog
  ) { }

  ngOnInit() {
  }

  createNewSpace(){
    const _dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '300px',
      maxWidth : '50%',
      data: {
      }
    });

    _dialogRef.closed.subscribe(result => {
      console.log(result);
    });
  }
}
