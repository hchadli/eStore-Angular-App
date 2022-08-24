import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    constructor(private shoppingListService: ShoppingListService) { }
    
    recipesChanged = new Subject<Recipe[]>();

    // private recipes : Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel', 
    //         'A super-tasty Schnitzel - just awesome !' , 
    //         'https://www.jumbo.com/dam/inspiratie/blog/schnitzel/Blog-Schnitzel-mobile.jpg',
    //          [new Ingredient('Meat', 3), new Ingredient('French Fries' , 20)]),
    //     new Recipe('Big Fat Burger', 
    //         'What else you need to say ?',
    //         'https://www.fatburgercanada.com/wp-content/uploads/2018/09/fb18_FatCheeseBeer.png',
    //         [new Ingredient('Buns', 2), new Ingredient('Meat', 3)])
    // ];
    
    private recipes : Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
    }

    getRecipes(){
        return this.recipes.slice();   // Returns a copy of this array
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    toShoppingList(ingredients : Ingredient []){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(id: number, newRecipe: Recipe) {
        this.recipes[id] = newRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.getRecipes());
    }
}