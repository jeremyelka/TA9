import { Component, Input, OnInit, ViewChild, AfterViewInit, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

interface ItemElement {
  color: string;
  name: string;
  createDate: string;
  lastUpdate: string;
  createdBy: string;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit, AfterViewInit {

  @Input() items: Signal<ItemElement[]> = signal([]);


  @Input() viewType: string = 'list';


  displayedColumns: string[] = ['color', 'name', 'createDate', 'lastUpdate', 'createdBy'];


  pageSizes: number[] = [3, 5, 10];
  pageSize = signal(3);


  dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.items());
    return dataSource;
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.paginator && this.dataSource()) {
      this.dataSource().paginator = this.paginator;
    }
  }
}