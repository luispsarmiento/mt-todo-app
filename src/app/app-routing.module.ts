import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login/login.component';
import { BoardsComponent } from './pages/boards/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'boards',
    component: BoardsComponent
  },
  {
    path: 'board',
    component: BoardComponent
  },
  {
    path: 'scroll',
    component: ScrollComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  { path: "**", redirectTo: "boards", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
