
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples' , 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(id: number) {
        return this.ingredients[id];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(id: number, newIngredient : Ingredient) {
        this.ingredients[id] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        // for (let ingredient of ingredients){       // To prevent many emissions (emit) we use the spread operator
        //     this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);   // One elegant line
        this.ingredientsChanged.next(this.ingredients.slice());   // and here we emit just one time.
    }

}