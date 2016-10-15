import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationListComponent }      from './configuration-list.component';

const appRoutes: Routes = [
    {
        path: 'configuration-list',
        component: ConfigurationListComponent
    },

    {
        path: '',
        redirectTo: '/configuration-list',
        pathMatch: 'full'
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
