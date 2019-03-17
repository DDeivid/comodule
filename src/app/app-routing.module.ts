import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [
  {
    path: 'graph',
    component: GraphComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: '/graph',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
