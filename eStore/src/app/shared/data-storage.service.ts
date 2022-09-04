import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn : 'root'})
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipeService : RecipeService,
        private authService: AuthService) { }
    
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://e-store-angular-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response =>{
                console.log(response);
        });
        
    }

    fetchRecipes() {
        return this.http
        .get<Recipe[]>('https://e-store-angular-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
        .pipe(
        map(recipes => {    // Observable imported from rxjs
            return recipes.map(recipe => {   // this map is just a JS function that map elements
                return {
                    ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
          }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
    )   
}

}