import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CoordinateComponent } from './pages/coordinate/coordinate.component';
import { TablesComponent } from './pages/tables/tables.component';

export const routes: Routes = [
  { path: '', redirectTo: 'coordinate', pathMatch: 'full' },
  { path: 'coordinate', component: CoordinateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tables', component:TablesComponent  }
];
