import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaskComponent } from './card-task.component';

describe('CardTaskComponent', () => {
  let component: CardTaskComponent;
  let fixture: ComponentFixture<CardTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTaskComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardTaskComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept inputs', () => {
    component.cardTitle = 'Test Title';
    component.cardDescription = 'Test Description';
    component.cardCompleted = false;

    expect(component.cardTitle).toBe('Test Title');
    expect(component.cardDescription).toBe('Test Description');
    expect(component.cardCompleted).toBeFalse();
  });

  it('should emit onDelete event when delete method is called', () => {
    spyOn(component.onDelete, 'emit');

    component.delete();

    expect(component.onDelete.emit).toHaveBeenCalled();
  });

  it('should emit onCompleted event when completed method is called', () => {
    spyOn(component.onCompleted, 'emit');

    component.completed();

    expect(component.onCompleted.emit).toHaveBeenCalled();
  });
});