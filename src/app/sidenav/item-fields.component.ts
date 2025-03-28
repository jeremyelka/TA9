import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedItem } from '../store/table-store/data-table.selector';
import { take } from 'rxjs/operators';
import { addOrUpdateItem } from '../store/table-store/data-table.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-fields',
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './item-fields.component.html',
  styleUrls: ['./item-fields.component.scss']
})
export class ItemFieldsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  selectedColor: string = '#000000';
  newItemTitle: string = '';
  newItemDescription: string = '';

  colorOptions = [
    { value: '#000000' },
    { value: '#FF5733' },
    { value: '#33FF57' },
    { value: '#3357FF' },
    { value: '#FF33A1' },
    { value: '#FFFF33' },
  ];
  id: number = 0;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectSelectedItem).subscribe(item => {
      if (item) {
        this.id = item.id;
        this.newItemTitle = item.name;
        this.selectedColor = item.color;
        this.newItemDescription = item.createDate; // Or another property
      }
    });
  }

  saveChanges() {

    const newItem = {
        id: this.id?this.id:this.id=Math.floor(Math.random() * 1000), // Unique ID based on timestamp
        name: this.newItemTitle,
        color: this.selectedColor,
        description: this.newItemDescription,
        createDate: new Date().toLocaleDateString(),
        lastUpdate: new Date().toLocaleDateString(),
        createdBy: 'Admin', 
    };
    this.store.dispatch(addOrUpdateItem({ item: newItem }));
  }
  

  closeSidebar() {
    this.id = 0;
    this.newItemTitle = '';
    this.selectedColor = ''; 
    this.newItemDescription = '';
    this.close.emit();
  }
  
}
