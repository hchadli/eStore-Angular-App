import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes : Routes = 
[
    {path: '', redirectTo: '/recipes', pathMatch : "full"},

    // What really do the next lines, they separate in a new bundle the Modules and all their dependencies, so we can access them lazily and only upon demand
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then((module) => module.RecipesModule)},
    {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then((module) => module.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)},
];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes , {preloadingStrategy: PreloadAllModules})],
    exports : [RouterModule]    // we're exporting this in order to be imported at app-module level
})
export class AppRoutingModule{


}