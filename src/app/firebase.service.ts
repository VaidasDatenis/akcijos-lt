import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, Subject, map, of } from 'rxjs';
import { Product, enumMarketsList } from './product.interface';
// import { ikiProducts } from 'src/assets/data/iki';
// import { maximaProducts } from 'src/assets/data/maxima';
// import { rimiProducts } from 'src/assets/data/rimi';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(AngularFireDatabase);
  products$!: Observable<Product[]>;
  // products$!: any;
  // products$!: AngularFireObject<Product>;
  // ikiData = ikiProducts;
  // maximaData = maximaProducts;
  // rimiData = rimiProducts;
  // marketProducts: AngularFirestoreCollection<Product> | undefined;

  constructor() { }

  getAllMarketProducts(market: string): Observable<Product[]> {
    return this.firestore.list<Product>(market).valueChanges();
  }

  // THIS  IS DEMO DATA CALL
  // getProductsByCategory(marketName: string, category: string): Observable<Product[]> {
  //   if (marketName === enumMarketsList.MAXIMA) {
  //     return of(this.maximaData);
  //   }
  //   if (marketName === enumMarketsList.IKI) {
  //     return of(this.ikiData);
  //   }
  //   if (marketName === enumMarketsList.RIMI) {
  //     return of(this.rimiData);
  //   }
  //   return of([]);
  // }
}
