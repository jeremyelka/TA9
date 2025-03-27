import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableDataComponent } from '../table-data/table-data.component';
import { ApiService } from '../services/api/api.service';
import { CardDataComponent } from '../card-data/card-data.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface ItemElement {
  color: string;
  name: string;
  createDate: string;
  lastUpdate: string;
  createdBy: string;
}

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
    MatInputModule
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

  isSidenavOpen = signal(false);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.itemsSignal.set([
      { color: '#6EE7B7', name: 'Car accident', createDate: '03/02/2021', lastUpdate: '03/02/2021', createdBy: 'Ori Lugasi' },
      { color: '#F472B6', name: 'Human trafficking for prostitution', createDate: '26/01/2021', lastUpdate: '26/01/2021', createdBy: 'Ran Shim' },
      { color: '#F472B6', name: 'Human trafficking for prostitution', createDate: '26/01/2021', lastUpdate: '26/01/2021', createdBy: 'Ran Shim' },
      { color: '#F472B6', name: 'Human trafficking for prostitution', createDate: '26/01/2021', lastUpdate: '26/01/2021', createdBy: 'Ran Shim' },
      { color: '#F472B6', name: 'Human trafficking for prostitution', createDate: '26/01/2021', lastUpdate: '26/01/2021', createdBy: 'Ran Shim' },
    ]);;
  }

  toggleViewType() {
    this.viewType.set(this.viewType() === 'list' ? 'grid' : 'list');
  }

  onFilterInputChange() {
    console.log('filterInputValue:', this.filterInputValue);
    this.filterText.set(this.filterInputValue);
    console.log('filterText signal value:', this.filterText());
    console.log('filteredItems after filter:', this.filteredItems());
    console.log('filteredItems after filter:', this.itemsSignal()); // Log filtered items
  }

  toggleSidenav() {
    this.isSidenavOpen.update((open) => !open);
  }
}