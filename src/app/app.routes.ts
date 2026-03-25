import { Routes } from '@angular/router';
import { Home} from './pages/home/home';
import { ApiData } from './pages/api-data/api-data';
import { Form } from './pages/form/form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'api-data', component: ApiData},
  { path: 'form', component: Form},
  { path: '**', redirectTo: '' }
];

