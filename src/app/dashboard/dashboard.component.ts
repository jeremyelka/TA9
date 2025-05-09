import { Component, computed, OnInit, signal, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableDataComponent } from '../table-data/table-data.component';
import { ApiService } from '../services/api/api.service';
import { CardDataComponent } from '../card-data/card-data.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemFieldsComponent } from '../sidenav/item-fields.component';
import { addMultipleItems, selectItem } from '../store/table-store/data-table.actions';
import { Store } from '@ngrx/store';
import { selectAllItems } from '../store/table-store/data-table.selector';
import { ItemElement } from '../interfaces/ItemElement.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableDataComponent,
    CardDataComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ItemFieldsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemsSignal = signal<ItemElement[]>([]);
  viewType = signal<'list' | 'grid'>('list');
  filterText = signal<string>('');
  filterInputValue: string = '';
  filteredItems = computed(() => {
    const filter = this.filterText().toLowerCase();
    return this.itemsSignal().filter(item =>
      item.name.toLowerCase().includes(filter)
    );
  });
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isSidenavOpen = signal(false);

  constructor(private apiService: ApiService, private store: Store) {}

  ngOnInit() {
    this.apiService.getData('http://localhost:4200/assets/data.json').subscribe({
      next: (items : any) => {
        this.itemsSignal.set(items);
      },
      error: (error : any) => {
        console.error('Error fetching items', error);
      }
    });
    this.store.dispatch(addMultipleItems({ items: this.itemsSignal() }));
    this.subscribeToStore();
  }

  subscribeToStore(){
    this.store.select(selectAllItems).subscribe(items => {
      if (items) {
        this.itemsSignal.set(items);
      }
    });
  }

  closeSidenav() {
    this.sidenav.close();
  }
  

  editItem(item : ItemElement) {
    this.isSidenavOpen.set(true);
    this.store.dispatch(selectItem({ item }));
  }

  toggleViewType() {
    this.viewType.set(this.viewType() === 'list' ? 'grid' : 'list');
  }

  onFilterInputChange() {
    this.filterText.set(this.filterInputValue);
  }

  toggleSidenav() {
    this.isSidenavOpen.update((open) => !open);
  }

}