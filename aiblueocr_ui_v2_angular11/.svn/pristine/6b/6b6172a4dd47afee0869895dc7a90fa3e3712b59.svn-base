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


import { StatsBaseComponent } from '../../../components/body/advisormodel/statsbase/statsbase.component';
import { ManualBaseComponent } from '../../../components/body/advisormodel/manualbase/manualbase.component';
import { AiBaseComponent } from '../../../components/body/advisormodel/aibase/aibase.component';
import { SegmentSelectComponent } from '../../../components/body/advisormodel/aibase/segmentselect/segmentselect.component';
import { PrefDefinitionComponent } from '../../../components/body/advisormodel/aibase/prefdefinition/prefdefinition.component';
import { ModelEvaluationComponent } from '../../../components/body/advisormodel/aibase/modelevaluation/modelevaluation.component';
import { DatasetComponent } from './aibase/dataset/dataset.component';
import { DataSplitComponent } from './aibase/datasplit/datasplit.component';
import { AlgSelectComponent } from './aibase/algselect/algselect.component';
import { ModelLearnComponent } from './aibase/modellearn/modellearn.component';

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
            { path: '', redirectTo: 'aimodel', pathMatch: 'full' },


            /*추천모델*/
            { path: 'aimodel', component: AiBaseComponent },
            { path: 'statsmodel', component: StatsBaseComponent },
            { path: 'manualmodel', component: ManualBaseComponent },



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
        // AgGridModule.withComponents([GridCellRendererTouchSpin]),
        NgbModule,
        ChartModule,
    ],
    declarations: [
        // PageComponent,
        AiBaseComponent,
        StatsBaseComponent,
        ManualBaseComponent,
        SegmentSelectComponent,
        PrefDefinitionComponent,
        ModelEvaluationComponent,
        DatasetComponent,
        DataSplitComponent,
        AlgSelectComponent,
        ModelLearnComponent,
        ],
    entryComponents: [
    ],
    providers: [
        PagerService // ,ApigatewayService
    ],
    exports: [RouterModule],
})
export class AdvisormodelRoutingModule {}
