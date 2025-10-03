import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';
import { loginGuard } from './common/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
        canActivate: [authGuard], // ✅ aquí aplicas el guard
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'transactions',
                loadComponent: () =>
                    import('./pages/transactions/transactions.component').then(m => m.TransactionsComponent)
            },
            {
                path: 'add',
                loadComponent: () =>
                    import('./pages/add-transaction/add-transaction.component').then(m => m.AddTransactionComponent)
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./pages/profile/profile.component').then(m => m.ProfileComponent)
            },
            {
                path: '',
                redirectTo: '/tabs/dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate : [loginGuard] // ✅ aquí aplicas el guard
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate : [loginGuard] // ✅ aquí aplicas el guard
    },
    {
        path: 'recover-password',
        loadComponent: () => import('./pages/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent),
        canActivate : [loginGuard] // ✅ aquí aplicas el guard
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
