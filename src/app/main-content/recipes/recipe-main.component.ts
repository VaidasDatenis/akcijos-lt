import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject } from "@angular/core";
import { Subject } from "rxjs";
import { FirebaseService } from "src/app/firebase.service";
import { Recipe } from "src/app/recipe.interface";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { getMarketLabel, loadRecipeFromMarket } from "src/app/utils";
import { Animations } from "./animations";

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: 'recipe-main.component.html',
  styleUrls: ['recipe-main.component.scss'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    RecipeDetailsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: Animations.page,
})
export class RecipeMainComponent {
  private firestoreService = inject(FirebaseService);
  recipes$ = new Subject<Recipe[]>();
  selectedRecipe: Recipe | null = null;
  selectedMarket!: string;
  defaultMarket = 'maxima';

  constructor() {
    effect(() => {
      this.selectedMarket = this.firestoreService.selectedMarketTab();
      const marketRecipe = loadRecipeFromMarket(this.firestoreService.selectedMarketTab());
      this.firestoreService.getMarketRecipes(marketRecipe)
        .subscribe((data) => this.recipes$.next(data))
    });

    effect(() => {
      if (this.defaultMarket !== this.firestoreService.selectedMarketTab()) {
        this.selectedRecipe = null;
        this.defaultMarket = this.selectedMarket;
      }
    });
  }

  getMarketLabel(): string {
    return getMarketLabel(this.firestoreService.selectedMarketTab());
  }

  selectRecipe(recipe: Recipe) {
    if (this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
      this.selectedRecipe = null;
    } else {
      this.selectedRecipe = recipe;
    }
  }
}
