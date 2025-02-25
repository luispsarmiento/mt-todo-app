import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit {

  title: string = "Space Overview";

  spaceId$: Observable<string | undefined>;
  isEditing: any;
  spaceDescription: any;

  faEdit = faEdit;
  spaceId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: SpaceService) {
    this.spaceId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  }

  ngAfterViewInit(): void {
    this.spaceId$.subscribe((id) => {
      if (id) {
        this.spaceId = id;
      }

      this.service.spaces$.subscribe((spaces) => {
        const space = spaces.find((space) => space._id === id);
        if (space) {
          this.title = space.name;
          this.spaceDescription = space.description;
        }
      });
    });
  }

  ngOnInit() {

  }

  saveChanges(){
    this.isEditing = false;
    this.service.update(this.spaceId, {
      name: this.title,
      description: this.spaceDescription
    }).subscribe();
  }
}
