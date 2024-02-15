import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { Subject } from "rxjs";
import { FirebaseService } from "src/app/firebase.service";
import { Recipe } from "src/app/recipe.interface";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { trigger, style, transition, animate } from '@angular/animations';
import { getMarketLabel, loadRecipeFromMarket } from "src/app/utils";

@Component({
  standalone: true,
  selector: 'app-recipes',
  templateUrl: 'recipe-main.component.html',
  styleUrls: ['recipe-main.component.scss'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
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
export class RecipeMainComponent implements AfterViewInit {
  @ViewChild('scrollableNav', { static: false }) scrollableNav!: ElementRef;
  private firestoreService = inject(FirebaseService);
  recipes$ = new Subject<Recipe[]>();
  selectedRecipe: Recipe | null = null;

  constructor() {
    effect(() => {
      let marketRecipe = loadRecipeFromMarket(this.firestoreService.selectedMarketTab());
      this.firestoreService.getMarketRecipes(marketRecipe)
        .subscribe((data) => this.recipes$.next(data))
    });
  }

  ngAfterViewInit() {
    if (this.scrollableNav) {
      this.scrollableNav.nativeElement.scrollLeft = 0;
    }
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

  scrollLeft() {
    this.scrollableNav.nativeElement.scrollToPosition -= 3000;
    // console.log(this.scrollableNav.nativeElement.scrollLeft -= 100);
  }

  scrollRight() {
    this.scrollableNav.nativeElement.scrollLeft += 3000;
    // console.log(this.scrollableNav.nativeElement.scrollLeft += 100);
  }
}
