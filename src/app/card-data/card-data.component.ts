import { Component, Input, OnInit, ViewChild, AfterViewInit, Signal, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface ItemElement {
  id:number,
  color: string;
  name: string;
  createDate: string;
  lastUpdate: string;
  createdBy: string;
}

@Component({
  selector: 'app-card-data',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit, AfterViewInit {
  @Input() items: Signal<ItemElement[]> = signal([]);
  @Output() editItem = new EventEmitter<ItemElement>();

  pageSizes: number[] = [3, 5, 10];
  pageSize = signal(3);
  currentPage = signal(0);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filteredItems = computed(() => {
    return this.items();
  });

  paginatedItems = computed(() => {
    const startIndex = this.currentPage() * this.pageSize();
    return this.filteredItems().slice(startIndex, startIndex + this.pageSize());
  });

  ngOnInit() {}

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.currentPage.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
    });
  }

  sendItem(item : ItemElement){
    this.editItem.emit(item);
  }
}
