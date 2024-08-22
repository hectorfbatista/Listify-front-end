import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { ITask } from '../../shared/interfaces/task-interface';
import { TaskService } from '../../shared/services/task.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask', 'completedTask']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    const mockTasks: ITask[] = [
      { _id: '1', title: 'Task 1', completed: true },
      { _id: '2', title: 'Task 2', completed: false },
      { _id: '3', title: 'Task 3', completed: true }
    ];
    taskServiceMock.getTasks.and.returnValue(of(mockTasks));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch tasks', () => {
    component.ngOnInit();

    expect(taskServiceMock.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual([
      { _id: '2', title: 'Task 2', completed: false },
      { _id: '3', title: 'Task 3', completed: true },
      { _id: '1', title: 'Task 1', completed: true }
    ]);
  });

  it('should delete a task and show success message', () => {
    const mockTask: ITask = { _id: '1', title: 'Task 1', completed: false };
    component.tasks = [mockTask];

    taskServiceMock.deleteTask.and.returnValue(of({}));

    component.delete(mockTask);

    expect(taskServiceMock.deleteTask).toHaveBeenCalledWith('1');
    expect(snackBarMock.open).toHaveBeenCalledWith('Tarefa deletada com sucesso!', undefined, { duration: 2000, panelClass: ['sucess'] });
    expect(component.tasks.length).toBe(0);
  });

  it('should complete a task and show the correct message', () => {
    const mockTask: ITask = { _id: '1', title: 'Task 1', completed: false };
    component.tasks = [mockTask];

    taskServiceMock.completedTask.and.returnValue(of({}));

    component.completed(mockTask);

    expect(mockTask.completed).toBeTrue();
    expect(taskServiceMock.completedTask).toHaveBeenCalledWith('1', mockTask);
    expect(snackBarMock.open).toHaveBeenCalledWith('Tarefa comcluída com sucesso!', undefined, { duration: 2000, panelClass: ['sucess'] });
  });

  it('should reopen a task and show the correct message', () => {
    const mockTask: ITask = { _id: '1', title: 'Task 1', completed: true };
    component.tasks = [mockTask];

    taskServiceMock.completedTask.and.returnValue(of({}));

    component.completed(mockTask);

    expect(mockTask.completed).toBeFalse();
    expect(taskServiceMock.completedTask).toHaveBeenCalledWith('1', mockTask);
    expect(snackBarMock.open).toHaveBeenCalledWith('Tarefa reaberta com sucesso!', undefined, { duration: 2000, panelClass: ['sucess'] });
  });
});