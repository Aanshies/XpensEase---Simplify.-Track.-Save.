import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './features/home/home.component';
import { ExpenseComponent } from './features/expense/expense.component';
import { SpendingComponent } from './features/spending/spending.component';
import { BudgetComponent } from './features/budget/budget.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { MulticurrencyComponent } from './features/multicurrency/multicurrency.component';
import { VoiceComponent } from './features/voice/voice.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'expense',
    loadComponent: () =>
      import('./features/expense/expense.component').then((m) => m.ExpenseComponent),
  },
  {
    path: 'spending',
    loadComponent: () =>
      import('./features/spending/spending.component').then((m) => m.SpendingComponent),
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('./features/budget/budget.component').then((m) => m.BudgetComponent),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/calendar.component').then((m) => m.CalendarComponent),
  },
  {
    path: 'multicurrency',
    loadComponent: () =>
      import('./features/multicurrency/multicurrency.component').then((m) => m.MulticurrencyComponent),
  },
  {
    path: 'voice',
    loadComponent: () =>
      import('./features/voice/voice.component').then((m) => m.VoiceComponent),
  },
  {
    path: 'report',
    loadComponent: () =>
      import('./features/report/report.component').then((m) => m.ReportComponent),
  },
  
];
