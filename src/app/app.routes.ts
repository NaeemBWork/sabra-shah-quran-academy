import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home - Sabra Shah Quran Academy'
  },
  {
    path: 'donate',
    loadComponent: () => import('./pages/donate/donate.component').then(m => m.DonateComponent),
    title: 'Donate - Sabra Shah Quran Academy'
  },
  {
    path: 'trustees',
    loadComponent: () => import('./pages/trustees/trustees.component').then(m => m.TrusteesComponent),
    title: 'Trustees - Sabra Shah Quran Academy'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact - Sabra Shah Quran Academy'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
