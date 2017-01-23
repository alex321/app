import {RouterModule, Routes} from '@angular/router';

import {CardEditComponent} from './card-edit/card-edit.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new', component: CardEditComponent},
  {path: 'edit/:character', component: CardEditComponent}
];

export const routing = RouterModule.forRoot(routes);
