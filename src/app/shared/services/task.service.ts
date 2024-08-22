import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '../interfaces/task-interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>('http://localhost:3000/task');
  }

  createTask(task: ITask) {
    return this.httpClient.post('http://localhost:3000/task', task);
  }

  deleteTask(id: string) {
    return this.httpClient.delete(`http://localhost:3000/task/${id}`);
  }

  completedTask(id: string, task: ITask) {
    return this.httpClient.put(`http://localhost:3000/task/${id}`, task);
  }

}

