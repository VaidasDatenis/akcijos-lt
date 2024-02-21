import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent, map } from 'rxjs';
import { Product, MarketListEnum, listOfMarkets } from '../product.interface';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { FirebaseService } from '../firebase.service';
import { AsyncPipe, DOCUMENT, NgFor, NgIf, ViewportScroller } from '@angular/common';
import { mapProductToCartProduct } from '../utils';
import { AddToCartService } from '../add-to-cart.service';
import { HeaderComponent } from './header/header.component';
import { ScrollComponent } from '../scroll/scroll.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardComponent } from './card/card.component';
import { FooterComponent } from '../footer/footer.component';
import { RecipeMainComponent } from './recipes/recipe-main.component';

@Component({
  standalone: true,
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss'],
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatTabsModule,
    HeaderComponent,
    RecipeMainComponent,
    FooterComponent,
    ScrollComponent,
    CardComponent,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit, OnDestroy {
  private firestoreService = inject(FirebaseService);
  private cartService = inject(AddToCartService);
  private cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);
  private readonly viewport = inject(ViewportScroller);
  private marketList = MarketListEnum;
  private products$ = new BehaviorSubject<Product[]>([
    {
      id: '',
      category: '',
      imageUrl: '',
      title: '',
      priceEur: '',
      priceCents: '',
      dateTo: '',
    },
  ]);
  private onDestroy$ = new Subject<void>();
  private marketName = 'maxima';
  asyncCategories = new Set<string>();
  marketsList = listOfMarkets;

  readonly showScroll$: Observable<boolean> = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  ngOnInit() {
    this.getMarketTab(this.marketList.MAXIMA);
    this.cartService.getOldProducts();
    this.cdr.detectChanges();
  }

  addItemEmitter(product: Product) {
    const mappedProduct = mapProductToCartProduct(product, this.marketName);
    this.cartService.addProductToCart(mappedProduct);
  }

  removeFromCartEmitter(product: Product) {
    const mappedProduct = mapProductToCartProduct(product, this.marketName);
    this.cartService.removeFromCart(mappedProduct);
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  productsByCategory(category: string) {
    return this.products$.pipe(map((products) => products.filter((product) => product.category === category)));
  }

  marketTabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.asyncCategories.clear();
    this.marketName = tabChangeEvent.tab.textLabel;
    this.getMarketTab(tabChangeEvent.tab.textLabel);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {}

  private getMarketTab(marketName: string) {
    return this.firestoreService
      .getAllMarketProducts(marketName)
      .pipe(
        map((products) => {
          this.products$.next(products);
          return products.filter((product) => {
            this.asyncCategories.add(product.category);
            this.cdr.detectChanges();
            return product;
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
