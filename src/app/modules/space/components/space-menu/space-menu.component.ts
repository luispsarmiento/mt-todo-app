import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import {
  faPlus,
  faFolder,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { SpaceService } from 'src/app/services/space.service';
import { Space } from 'src/app/models/space.model';

@Component({
  selector: 'app-space-menu',
  templateUrl: './space-menu.component.html',
  styleUrls: ['./space-menu.component.css']
})
export class SpaceMenuComponent implements OnInit {
  faPlus = faPlus;
  faFolder = faFolder;
  faSpinner = faSpinner;

  spaces: Space[] = [];
  isLoading: boolean = true;
  error: any;

  constructor(
    private dialog: Dialog,
    private service: SpaceService
  ) { }

  ngOnInit() {
    this.loadSpaces();
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

  loadSpaces(){
    this.isLoading = true;
    this.error = null;

    this.service.listSpaces().subscribe((spaces: Space[]) => {
      this.spaces = spaces;
      this.isLoading = false;
    }, (error) => {
      this.error = error;
      this.isLoading = false;
    });
  }
}
