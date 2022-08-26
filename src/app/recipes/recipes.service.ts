import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'schenitzel',
      imageUrl:
        'https://i.picsum.photos/id/301/200/300.jpg?hmac=J1lB0L-QDteqCpkHkYdHQBz6JYeppA2L1Y_8LRGLVfY',
      ingredients: ['French Fries'],
    },
    {
      id: 'r2',
      title: 'ddukbobkgi',
      imageUrl:
        'https://i.picsum.photos/id/301/200/300.jpg?hmac=J1lB0L-QDteqCpkHkYdHQBz6JYeppA2L1Y_8LRGLVfY',
      ingredients: ['rice cake', 'gochujang'],
    },
  ];
  constructor() {}

  getAllRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipe(id: string) {
    return { ...this.recipes.find((x) => x.id === id) };
  }
}
