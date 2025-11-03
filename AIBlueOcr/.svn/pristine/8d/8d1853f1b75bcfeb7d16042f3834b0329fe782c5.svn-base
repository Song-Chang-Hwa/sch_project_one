import { CommonModule } from '@angular/common'; // ng 모델을 쓰기위함
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // formGroup 를 쓰기위함
import { FormsModule } from '@angular/forms'; // ng 모델을 쓰기위함
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SafeHtmlModule } from '../../../../shared/pipes/pipe-safehtml-loadJsURL';
import { PageComponent } from '../../../components/page/page.component';
import { PagerService } from '../../../../shared/services/';
import { AgGridModule } from 'ag-grid-angular';

import { AdvisorSegmentComponent } from '../../../components/body/advisorsegment/advisorsegment.component';
import { AdvisorSegmentAnalysisComponent } from '../../../components/body/advisorsegment/advisorsegmentanalysis/advisorsegmentanalysis.component';
import { AdvisorSegmentDefinitionComponent } from '../../../components/body/advisorsegment/advisorsegmentdefinition/advisorsegmentdefinition.component';
import { AdvisorSegmentListComponent } from '../../../components/body/advisorsegment/advisorsegmentlist/advisorsegmentlist.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartModule } from 'angular2-chartjs';

import { CommonRoutingModule } from '../../../components/common/common-routing.module';

const routes: Routes = [
    {
        path: '',
        // component: AiBaseComponent,
        children: [
            { path: '', redirectTo: 'advisorsegment', pathMatch: 'full' },

            /*추천세그먼트*/
            { path: 'advisorsegment', component: AdvisorSegmentComponent },
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

        AdvisorSegmentComponent,
        AdvisorSegmentAnalysisComponent,
        AdvisorSegmentDefinitionComponent,
        AdvisorSegmentListComponent,
    ],
    entryComponents: [
    ],
    providers: [
        PagerService, // ,ApigatewayService
    ],
    exports: [RouterModule],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AdvisorsegmentRoutingModule {}
