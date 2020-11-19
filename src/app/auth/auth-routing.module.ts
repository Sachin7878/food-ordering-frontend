import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCardComponent } from './auth-card/auth-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{ path: 'card', component: AuthCardComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AuthRoutingModule {}
