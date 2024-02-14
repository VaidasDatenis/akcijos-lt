import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Recipe } from "src/app/recipe.interface";

@Component({
  standalone: true,
  selector: 'app-recipe-details',
  templateUrl: 'recipe-details.component.html',
  styleUrls: ['recipe-details.component.scss'],
  imports: [
    NgIf,
    NgFor,
    CurrencyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent {
  @Input() recipe!: Recipe;

  addExtraSpaceBetweenListItems(ingredients: string[]) {
    return ingredients.join(',\n\n');
  }
}