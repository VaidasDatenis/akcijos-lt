import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { Subject } from "rxjs";
import { FirebaseService } from "src/app/firebase.service";
import { Recipe, RecipeEnum } from "src/app/recipe.interface";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: 'recipe-main.component.html',
  styleUrls: ['recipe-main.component.scss'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    CurrencyPipe,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RecipeDetailsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailEnterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RecipeMainComponent implements OnInit {
  @ViewChild('scrollableNav') scrollableNav!: ElementRef;
  private firestoreService = inject(FirebaseService);
  private recipeEnum = RecipeEnum.MAXIMA_RECIPES;
  recipes$ = new Subject<Recipe[]>();
  selectedRecipe: Recipe | null = null;

  ngOnInit() {
    this.getRecipesByMarket();
  }

  getRecipesByMarket() {
    this.firestoreService.selectedMarketTab();
    console.log(this.firestoreService.selectedMarketTab());
    this.firestoreService.getMarketRecipes(this.recipeEnum).subscribe((data) => this.recipes$.next(data))
  }

  selectRecipe(recipe: Recipe) {
    if (this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
      this.selectedRecipe = null;
    } else {
      this.selectedRecipe = recipe;
    }
  }

  scrollLeft() {
    this.scrollableNav.nativeElement.scrollLeft -= 100;
  }

  scrollRight() {
    this.scrollableNav.nativeElement.scrollLeft -= 100;
  }
}