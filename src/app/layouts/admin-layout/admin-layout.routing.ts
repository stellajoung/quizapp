import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MyquizzesComponent } from '../../pages/myquizzes/myquizzes.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myquizzes', component: MyquizzesComponent },
  { path: 'user-profile', component: UserProfileComponent },
];
