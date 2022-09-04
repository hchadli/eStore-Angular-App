import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';
import { AlertComponent } from './alert/alert/alert.component';

@NgModule({
  declarations: 
  [
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    AlertComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: 
  [
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule { }
