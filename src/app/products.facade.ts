import { Injectable, inject } from '@angular/core';
import { Product } from './product.interface';
import { Observable, filter, map, BehaviorSubject, Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  fireDatabaseService = inject(FirebaseService);
  categories = new Set<string>();
  parsedProducts$ = new BehaviorSubject<Product[]>([{
    category: '',
    imageUrl: '',
    title: '',
    priceEur: '',
    priceCents: '',
    oldPrice: '',
  }]);

  mapData() {
    return this.fireDatabaseService.getAll().valueChanges().pipe(
      map((products) => {
        products.sort((a, b) => a.category.localeCompare(b.category));
        this.parsedProducts$.next(products);
        products.map((item) => this.categories.add(item.category));
      }
      )
    ).subscribe();
  }

  getCategories() {
    return this.categories;
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.parsedProducts$.pipe(
      map((products) => {
        products.sort((a, b) => a.title.localeCompare(b.title));
        return products.filter((product) => product.category === categoryName);
      })
    );
  }

}