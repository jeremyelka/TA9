import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface ItemElement {
  color: string;
  name: string;
  createDate: string;
  lastUpdate: string;
  createdBy: string;
}

@Component({
  selector: 'app-card-data',
  standalone: true,
  imports: [CommonModule, MatCardModule], 
  templateUrl: './card-data.component.html',
  styleUrl: './card-data.component.scss'
})
export class CardDataComponent {
  @Input() item!: ItemElement; 
}