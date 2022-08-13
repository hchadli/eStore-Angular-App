import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInputRef : ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef : ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingredient = new Ingredient
    (this.nameInputRef.nativeElement.value, 
    this.amountInputRef.nativeElement.value);
    this.shoppingListService.addIngredient(ingredient);
  }

}
