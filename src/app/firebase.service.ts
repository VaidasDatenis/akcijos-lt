import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(AngularFireDatabase);

  getAllMarketProducts(market: string): Observable<Product[]> {
    return this.firestore.list<Product>(market).valueChanges();
  }
}
