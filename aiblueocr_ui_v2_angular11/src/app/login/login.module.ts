import { NgModule,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from './services';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule],
    declarations: [LoginComponent],
    providers: [
         AuthenticationService
    ],
})
export class LoginModule {}
