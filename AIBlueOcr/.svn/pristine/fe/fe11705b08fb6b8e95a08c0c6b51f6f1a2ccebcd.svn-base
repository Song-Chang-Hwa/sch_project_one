import { CommonModule } from '@angular/common'; // ng 모델을 쓰기위함
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // formGroup 를 쓰기위함
import { FormsModule } from '@angular/forms'; // ng 모델을 쓰기위함
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SafeHtmlModule } from '../../../../shared/pipes/pipe-safehtml-loadJsURL';
import { PageComponent } from '../../../components/page/page.component';
import { PagerService } from '../../../../shared/services/'
import { AgGridModule } from 'ag-grid-angular';


import { IndividualComponent } from './individual/individual.component';

import { AbTestComponent } from './abtest/abtest.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-chartjs';

import {
     CommonRoutingModule
} from '../../../components/common/common-routing.module';

const routes: Routes = [
    {
        path: '',
        // component: AiBaseComponent,
        children: [
            { path: '', redirectTo: 'simulation', pathMatch: 'full' },


            /*개인화 추천결과 */
            { path: 'individual', component: IndividualComponent },
            { path: 'abtest', component: AbTestComponent },


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
        CommonRoutingModule,
        RouterModule.forChild(routes),
        NgbModule,
        ChartModule,
    ],
    declarations: [
        IndividualComponent,
        AbTestComponent
    ],
    entryComponents: [
    ],
    providers: [
        PagerService // ,ApigatewayService
    ],
    exports: [RouterModule
    ],
})
export class SimulationRoutingModule {}
