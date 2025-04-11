import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CoordinateComponent } from './pages/coordinate/coordinate.component';
import { Table1Component } from './pages/table1/table1.component';

export const routes: Routes = [
  { path: '', redirectTo: 'coordinate', pathMatch: 'full' },
  { path: 'coordinate', component: CoordinateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'table1', component: Table1Component }
];
