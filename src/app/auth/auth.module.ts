import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthCardComponent } from './auth-card/auth-card.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, AuthCardComponent],
  imports: [
    AngularMaterialModule,
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
  ],
})
export class AuthModule {}
