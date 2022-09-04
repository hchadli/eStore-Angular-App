import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ShoppingListComponent, ShoppingEditComponent ],
  imports: [
    RouterModule.forChild([{path: '', component: ShoppingListComponent}]),
    FormsModule,
    SharedModule,
  ],
  // providers: [LoggingService]   // Demo Purpose
})
export class ShoppingListModule { }
