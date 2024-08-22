import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CardTaskComponent } from '../../shared/components/card-task/card-task.component';
import { NewTaskRoutingModule } from './new-task-routing.module';
import { NewTaskComponent } from './new-task.component';

@NgModule({
  declarations: [NewTaskComponent],
  imports: [
    NewTaskRoutingModule,
    CardTaskComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
})
export class NewTaskModule { }