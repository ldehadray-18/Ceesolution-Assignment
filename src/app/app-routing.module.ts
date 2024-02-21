import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { DisplayListComponent } from './display-list/display-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'DisplayTask', pathMatch: 'full' },
  { path: 'AddTask', component: AddTaskComponent }, { path: 'DisplayTask', component: DisplayListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
