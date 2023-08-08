import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent, map } from 'rxjs';
import { Product, listOfMarkets } from '../product.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FirebaseService } from '../firebase.service';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { transformPrices } from '../utils';
import { AddToCartService } from '../add-to-cart.service';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit, OnDestroy {
  firestoreService = inject(FirebaseService);
  cartService = inject(AddToCartService);
  private readonly document = inject(DOCUMENT);
  private readonly viewport = inject(ViewportScroller);
  transformPrices = transformPrices;
  products$ = new BehaviorSubject<Product[]>([
    {
      category: '',
      imageUrl: '',
      title: '',
    },
  ]);
  onDestroy$ = new Subject<void>();
  asyncTabs = new BehaviorSubject<Set<string>>(new Set<string>());
  asyncCategories = new Set<string>();
  marketName = 'maxima';
  marketsList = listOfMarkets;

  @ViewChild('marketTabGroup') marketTabGroup!: { selectedIndex: number };
  @ViewChild('tabGroup') tabGroup!: { selectedIndex: number };

  readonly showScroll$: Observable<boolean> = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getMarketTab('maxima');
    this.cartService.getOldProducts();
    this.cdr.detectChanges();
  }

  getAddItemEmitter(product: Product, index: number) {
    const { priceEur, priceCents } = product;
    const mappedProduct = {
      ...product,
      market: this.marketName,
      price: this.transformPrices(priceEur, priceCents),
    };
    this.cartService.addCartItem(mappedProduct);
  }

  getMarketTab(marketName: string) {
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

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
