import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { remove } from 'lodash';

import { ITask } from '../../shared/interfaces/task-interface';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasks: ITask[] = []

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  delete(task: ITask) {
    if(task._id) {
      this.taskService.deleteTask(task._id).subscribe( () => {
        this.openSnackBar('Tarefa deletada com sucesso!');
      });
      remove(this.tasks,  (x: ITask) => x === task);
    }
  }

  completed(task: ITask) {
    if(task._id) {
      task.completed = !task.completed;
      this.taskService.completedTask(task._id, task).subscribe( () => {
        const message = task.completed ? 'Tarefa comcluída com sucesso!' : 'Tarefa reaberta com sucesso!'
        this.openSnackBar(message);
        this.getTasks();
      })
    }
  }

  private getTasks() {
    this.taskService.getTasks().subscribe((response: ITask[]) => {
        const invertedTasks = response.reverse();
        this.tasks = invertedTasks.sort((a, b) => {
            return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
        });
    });
}

  private openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000, panelClass: [ 'sucess'] });
  }

}
