import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, AfterViewInit {

  title: string = "Space Overview";

  quizId$: Observable<string | undefined>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.quizId$ = this.activatedRoute.params.pipe(map((params) => params['id']));
  }

  ngAfterViewInit(): void {
    this.quizId$.subscribe((id) => {
      console.log(id);
    });
  }

  ngOnInit() {

  }

}
