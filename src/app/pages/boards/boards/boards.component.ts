import { Component, OnInit } from '@angular/core';
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { 
  faBox, 
  faWaveSquare, 
  faClock, 
  faAngleUp, 
  faAngleDown, 
  faHeart, 
  faBorderAll, 
  faUsers, 
  faGear,
  faFile,
  faSignIn,
  faListAlt,
  faTable
} from '@fortawesome/free-solid-svg-icons';
import { Board } from 'src/app/models/board.model';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: []
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faWaveSquare = faWaveSquare;
  faBox = faBox;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  faFile = faFile;
  faSignIn = faSignIn;
  faListAlt = faListAlt;
  faTable = faTable;

  boards: Board[] = [
    {
      name: "Board 1",
      color: "bg-sky-700"
    },
    {
      name: "Board 2",
      color: "bg-green-700"
    },
    {
      name: "Board 3",
      color: "bg-amber-700"
    },
    {
      name: "Board 4",
      color: "bg-indigo-700"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
