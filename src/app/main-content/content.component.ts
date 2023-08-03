import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Observer,
  Subject,
  filter,
  fromEvent,
  map,
  of,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Product, listOfMarkets } from '../product.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FirebaseService } from '../firebase.service';
import { DOCUMENT, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit, OnDestroy {
  firestoreService = inject(FirebaseService);
  private readonly document = inject(DOCUMENT);
  private readonly viewport = inject(ViewportScroller);
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

  marketsList = listOfMarkets;

  @ViewChild('marketTabGroup') marketTabGroup!: { selectedIndex: number };
  @ViewChild('tabGroup') tabGroup!: { selectedIndex: number };

  readonly showScroll$: Observable<boolean> = fromEvent(this.document, 'scroll').pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getMarketTab('maxima');
    this.cdr.detectChanges();
  }

  getMarketTab(marketName: string) {
    return this.firestoreService
      .getAllMarketProducts(marketName)
      .pipe(
        map((products) => {
          console.log(products);
          this.products$.next(products);
          return products.filter((product) => {
            this.asyncCategories.add(product.category);
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
    console.log(tabChangeEvent);
    this.asyncCategories.clear();
    this.getMarketTab(tabChangeEvent.tab.textLabel);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
