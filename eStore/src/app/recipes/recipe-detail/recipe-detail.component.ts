import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe : Recipe;
  id : number;

  constructor(
    private recipeService: RecipeService, 
    private route : ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
   this.route.params.subscribe(params => {
    this.id =  +params['id'];
    this.recipe = this.recipeService.getRecipe(this.id)
   });
  }

  toShoppingList(){
   this.recipeService.toShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){

    // More explicitly - complex navigation and useful in many situations
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})

    this.router.navigate(['edit'], {relativeTo: this.route}); // Straight forward path to reach the edit mode 
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate([''], {relativeTo: this.route});
  }

}
