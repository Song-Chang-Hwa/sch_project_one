import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'root',
    // },

    {
        path: '',
        loadChildren: () => import('app/main/main-routing.module').then(m => m.MainRoutingModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: () => import('app/login/login.module').then(m => m.LoginModule),
    },

    // {
    //     path: 'charts',
    //     loadChildren: () =>
    //         import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    // },
    // {
    //     path: 'dashboard',
    //     loadChildren: () =>
    //         import('modules/dashboard/dashboard-routing.module').then(
    //             m => m.DashboardRoutingModule
    //         ),
    // },
    // {
    //     path: 'auth',
    //     loadChildren: () =>
    //         import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    // },
    // {
    //     path: 'error',
    //     loadChildren: () =>
    //         import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    // },
    // {
    //     path: 'tables',
    //     loadChildren: () =>
    //         import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    // },
    // {
    //     path: 'version',
    //     loadChildren: () =>
    //         import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    // },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            // relativeLinkResolution: 'legacy',
            useHash: true,
            onSameUrlNavigation: 'reload',
        }),
    ],
    declarations: [AlertComponent],
    exports: [RouterModule],
})
export class AppRoutingModule {}
