import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from "@angular/core";
import { ProductsFacade } from "../products.facade";
import { Observable, Observer, filter, map, of } from "rxjs";
import { Product } from "../product.interface";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { AngularFireDatabase } from "@angular/fire/compat/database";

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit, AfterViewInit {
  productsFacade = inject(ProductsFacade);
  categoryTabs$: Observable<Set<string>>;
  @ViewChild('tabGroup') tabGroup!: { selectedIndex: number; };

  constructor(private fireDatabase: AngularFireDatabase) {
    this.categoryTabs$ = new Observable((observer: Observer<Set<string>>) => {
      setTimeout(() => {
        observer.next(this.productsFacade.getCategories());
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.fireFacade();
  }

  ngAfterViewInit() {
    // console.log(this.tabGroup.selectedIndex);
  }

  fireFacade() {
    this.productsFacade.mapData();
  }

  productsByCategory(category: string): Observable<Product[]> {
    return this.productsFacade.getProductsByCategory(category);
  }

  productsList$ = this.productsFacade.parsedProducts$.pipe(
    filter((products) => !!products),
    map((products) => products)
  );

  tabChanged(tabChangeEvent: MatTabChangeEvent): void { }
}