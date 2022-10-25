import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'places',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'places',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./places/places.module').then((m) => m.PlacesPageModule),
  },
  {
    path: 'bookings',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
