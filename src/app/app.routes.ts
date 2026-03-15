import { Routes } from '@angular/router';
import { CatListComponent } from './features/cat-list/cat-list.component';
import { CatDetailComponent } from './features/cat-detail/cat-detail.component';
import { CatFormComponent } from './features/cat-form/cat-form.component';

export const routes: Routes = [
  { path: '', component: CatListComponent, title: 'All Cats' },
  { path: 'cat/new', component: CatFormComponent, title: 'New Cat' },
  { path: 'cat/:id', component: CatDetailComponent, title: 'Cat Details' },
  { path: 'cat/:id/edit', component: CatFormComponent, title: 'Edit Cat' },
  { path: '**', redirectTo: '' }
];
