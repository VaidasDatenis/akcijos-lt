import { Injectable, inject, signal } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Market, Product } from './product.interface';
import { Recipe } from './recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(AngularFireDatabase);
  public selectedMarketTab = signal<string>('');

  getAllMarketProducts(market: string): Observable<Product[]> {
    this.selectedMarketTab.set(market);
    return this.firestore.list<Product>(market).valueChanges();
  }

  getMarketRecipes(market: string): Observable<Recipe[]> {
    return this.firestore.list<Recipe>(market).valueChanges();
  }
}
