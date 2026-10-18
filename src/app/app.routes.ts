import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { AuthService } from './core/data.service';
import { Role } from './core/models';
const previewGuard: CanActivateFn = route => {
    const role = route.data['previewRole'] as Role;
    if (role)
        inject(AuthService).preview(role);
    return true;
};
export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent: () => import('./features/store/home.component').then(m => m.HomeComponent) },
    { path: 'shop', loadComponent: () => import('./features/store/shop.component').then(m => m.ShopComponent) },
    { path: 'shop/categories/:slug', loadComponent: () => import('./features/store/shop.component').then(m => m.ShopComponent) },
    { path: 'shop/products/:id', loadComponent: () => import('./features/store/product.component').then(m => m.ProductComponent) },
    { path: 'cart', loadComponent: () => import('./features/store/cart.component').then(m => m.CartComponent) },
    { path: 'checkout', loadComponent: () => import('./features/forms/checkout.component').then(m => m.CheckoutComponent) },
    { path: 'auth/:mode', loadComponent: () => import('./features/forms/auth.component').then(m => m.AuthComponent) },
    { path: 'account', loadComponent: () => import('./features/workspace/account.component').then(m => m.AccountShellComponent), children: [
            { path: '', pathMatch: 'full', loadComponent: () => import('./features/workspace/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'profile', data: { kind: 'profile' }, loadComponent: () => import('./features/workspace/settings.component').then(m => m.SettingsComponent) },
            { path: 'notifications', loadComponent: () => import('./features/workspace/notifications.component').then(m => m.NotificationsComponent) },
            { path: 'orders', data: { kind: 'orders' }, loadComponent: () => import('./features/workspace/list.component').then(m => m.ListComponent) },
            { path: 'orders/:id', loadComponent: () => import('./features/workspace/order-detail.component').then(m => m.OrderDetailComponent) },
            { path: 'services', data: { kind: 'services' }, loadComponent: () => import('./features/workspace/list.component').then(m => m.ListComponent) },
            { path: 'services/new', loadComponent: () => import('./features/forms/service-form.component').then(m => m.ServiceFormComponent) },
            { path: 'services/:id', loadComponent: () => import('./features/workspace/service-detail.component').then(m => m.ServiceDetailComponent) }
        ] },
    ...(['admin', 'ecommerce', 'office', 'engineer'] as Role[]).map(role => ({ path: role, canActivate: [previewGuard], data: { previewRole: role }, loadChildren: () => import('./features/workspace/workspace.routes').then(m => m.workspaceRoutes(role)) })),
    ...['services', 'about', 'contact', 'privacy', 'terms'].map(path => ({ path, loadComponent: () => import('./features/store/info.component').then(m => m.InfoComponent) })),
    { path: '**', loadComponent: () => import('./features/store/not-found.component').then(m => m.NotFoundComponent) }
];
