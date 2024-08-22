import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'home',
    loadChildren: ()=> import('./pages/home/home.module').then(m =>m.HomeModule)
  },
  {
    path:'new-task',
    loadChildren: ()=> import('./pages/new-task/new-task.module').then(m =>m.NewTaskModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }