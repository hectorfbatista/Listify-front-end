import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  addTask() {
    this.taskService.createTask(this.form.value).subscribe( () => {
      this.openSnackBar();
      this.form.reset();
    })
  }

  getMessageFormError(formCtrl: string): string {
    let msg = '';
    if (this.form.hasError('required', [formCtrl])) {
      msg = 'Campo Obrigatório';
    } else if(this.form.hasError('minlength', [formCtrl])) {
      msg = 'Campo deve conter no mínimo 3 caracteres';
    } else if(this.form.hasError('maxlength', [formCtrl])) {
      msg = 'Campo deve conter no máximo 200 caracteres';
    }
    return msg;
  }

  private openSnackBar() {
    this._snackBar.open("Tarefa criada com sucesso!", undefined, { duration: 2000, panelClass: [ 'sucess'] });
  }

  private createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      subTitle: ['', [Validators.maxLength(200)]]
    })
  }

}
