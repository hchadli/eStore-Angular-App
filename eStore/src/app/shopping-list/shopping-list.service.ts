import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples' , 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredient(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        // for (let ingredient of ingredients){       // To prevent many emissions (emit) we use the spread operator
        //     this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);   // One elegant line
        this.ingredientsChanged.emit(this.ingredients.slice());   // and here we emit just one time.
    }
}