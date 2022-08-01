import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[] = [
    new Recipe('Recipe  1', 'This is simply a test' , 'https://i.pinimg.com/originals/8d/c5/31/8dc531fd1168a51c9e5bc9aca0d45051.jpg'),
    new Recipe('Recipe 2', 'This is simply a test' , 'https://i.pinimg.com/originals/8d/c5/31/8dc531fd1168a51c9e5bc9aca0d45051.jpg')
  ];

  @Output() chosenRecipe = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipeItem: Recipe){
    this.chosenRecipe.emit(recipeItem);
  }

}
