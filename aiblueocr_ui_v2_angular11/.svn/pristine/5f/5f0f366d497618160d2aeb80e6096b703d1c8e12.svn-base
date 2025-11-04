import { CommonModule } from '@angular/common'; // ng 모델을 쓰기위함
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // formGroup 를 쓰기위함
import { FormsModule } from '@angular/forms'; // ng 모델을 쓰기위함
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ChartModule } from 'angular2-chartjs';

import { SafeHtmlModule } from '../shared/pipes/pipe-safehtml-loadJsURL';

import { RootComponent } from './components/body/root/root.component';
import { RecognitionComponent } from './components/body/recognition/recognition.component';
import { TrainingComponent } from './components/body/training/training.component';
import { CommonComponent } from './components/common/common.component';
import { GridCellRendererTouchSpin } from './components/common/grid/grid-cellrenderer-touchpin.component';
import { GridPrefComponent } from './components/common/grid/grid-pref.component';
import { GridPrefImpComponent } from './components/common/grid/grid-prefimp.component';
import { GridStatsComponent } from './components/common/grid/grid-stats.component';
import { PageComponent } from './components/page/page.component';
import { PagerService } from '../shared/services/'
import { MainComponent } from './main.component';
// import {
//      CommonRoutingModule
// } from './components/common/common-routing.module';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'root', pathMatch: 'full' },

            /*모니터링*/
            { path: 'root', component: RootComponent },

            /*메인*/
            { path: 'recognition', component: RecognitionComponent},
            
            /*학습*/
            { path: 'training', component: TrainingComponent},            

            /*추천유형정의*/
            // { path: 'advisortypedefinition', component: AdvisorTypeDefinitionComponent },
            {
                path: 'admin',
                loadChildren: () =>
                    import('app/main/components/body/admin/admin-routing.module').then(
                        m => m.AdminRoutingModule
                    ),
            },

            /*추천세그먼트*/
            // { path: 'advisorsegment', component: AdvisorSegmentComponent },
            {
                path: 'advisorsegment',
                loadChildren: () =>
                    import(
                        'app/main/components/body/advisorsegment/advisorsegment-routing.module'
                    ).then(m => m.AdvisorsegmentRoutingModule),
            },

            /*추천모델*/
            // { path: 'aimodel', component: AiBaseComponent },
            // { path: 'statsmodel', component: StatsBaseComponent },
            // { path: 'manualmodel', component: ManualBaseComponent },
            {
                path: 'advisormodel',
                loadChildren: () =>
                    import(
                        'app/main/components/body/advisormodel/advisormodel-routing.module'
                    ).then(m => m.AdvisormodelRoutingModule),
            },

            /*레이아웃*/
            // { path: 'layout', component: LayoutComponent },
            {
                path: 'layout',
                loadChildren: () =>
                    import('app/main/components/body/layout/layout-routing.module').then(
                        m => m.LayoutRoutingModule
                    ),
            },

            /*모델평가*/
            // { path: 'modelevaluation', component: ModelEvaluationComponent },

            /*시뮬레이션*/
            // { path: 'simulation', component: SimulationComponent },
            {
                path: 'simulation',
                loadChildren: () =>
                    import('app/main/components/body/simulation/simulation-routing.module').then(
                        m => m.SimulationRoutingModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SafeHtmlModule,
        CKEditorModule,
        RouterModule.forChild(routes),
        ChartModule,
        AgGridModule,
    ],
    declarations: [CommonComponent, RootComponent, MainComponent, PageComponent, RecognitionComponent, TrainingComponent],
    entryComponents: [],
    providers: [
        PagerService // ,ApigatewayService
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}
