import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TableDataComponent } from './table-data/table-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table-data', component: TableDataComponent },
];
