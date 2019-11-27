import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/products/list', pathMatch: 'full' },
    {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule)
    }
];

export const AppRoutingProviders: any[] = [];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
