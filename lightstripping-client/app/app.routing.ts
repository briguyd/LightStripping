import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationsComponent }      from './configurations.component';
import { ConfigurationDetailComponent }      from './configuration-detail.component';
import { DashboardComponent }      from './dashboard.component';

const appRoutes: Routes = [
    {
        path: 'configurations',
        component: ConfigurationsComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: ConfigurationDetailComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);