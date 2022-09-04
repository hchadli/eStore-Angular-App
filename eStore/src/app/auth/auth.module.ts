import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth.component';


const appRoutes : Routes = 
[
    {path: '', component: AuthComponent}
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
})
export class AuthModule { }
