import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { ITask } from '../../shared/interfaces/task-interface';
import { TaskService } from '../../shared/services/task.service';
import { NewTaskComponent } from './new-task.component';

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let taskServiceMock: jasmine.SpyObj<TaskService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    taskServiceMock = jasmine.createSpyObj('TaskService', ['createTask']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NewTaskComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form correctly', () => {
    component.ngOnInit();
    
    expect(component.form).toBeTruthy();
    expect(component.form.controls['title']).toBeDefined();
    expect(component.form.controls['subTitle']).toBeDefined();
  });

  it('should add a new task and show success message', () => {
    component.ngOnInit();
    component.form.controls['title'].setValue('New Task');
    component.form.controls['subTitle'].setValue('Task details');

    taskServiceMock.createTask.and.returnValue(of({}));

    component.addTask();

    expect(taskServiceMock.createTask).toHaveBeenCalledWith({ title: 'New Task', subTitle: 'Task details' } as ITask);
    expect(snackBarMock.open).toHaveBeenCalledWith('Tarefa criada com sucesso!', undefined, { duration: 2000, panelClass: ['sucess'] });
    expect(component.form.value).toEqual({ title: null, subTitle: null });
  });

  it('should return the required error message for the title field', () => {
    component.ngOnInit();
    component.form.controls['title'].setValue('');

    const errorMessage = component.getMessageFormError('title');

    expect(errorMessage).toEqual('Campo Obrigatório');
  });

  it('should return the minLength error message for the title field', () => {
    component.ngOnInit();
    component.form.controls['title'].setValue('A');

    const errorMessage = component.getMessageFormError('title');

    expect(errorMessage).toEqual('Campo deve conter no mínimo 3 caracteres');
  });

  it('should return the correct error message for the subTitle field', () => {
    component.ngOnInit();
    component.form.get('subTitle')?.clearValidators();
    component.form.get('subTitle')?.addValidators(Validators.maxLength(2));
    component.form.controls['subTitle'].updateValueAndValidity();
    component.form.controls['subTitle'].setValue('1234');

    const errorMessage = component.getMessageFormError('subTitle');

    expect(errorMessage).toEqual('Campo deve conter no máximo 200 caracteres');
  });
});