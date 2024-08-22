import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class CardTaskComponent {
  @Input('card-title') cardTitle: string | undefined;
  @Input('card-description') cardDescription: string | undefined;
  @Input('card-completed') cardCompleted!: boolean;
  @Output() onDelete = new EventEmitter();
  @Output() onCompleted = new EventEmitter();

  delete() {
    this.onDelete.emit();
  }

  completed() {
    this.onCompleted.emit();
  }
}
