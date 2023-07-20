import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  // fireStore = inject(AngularFirestore);
  // fireDatabase = inject(AngularFireDatabase);

  private dbPath = '/maxima';
  productsRef: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
    this.productsRef = this.firestore.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Product> {
    return this.productsRef;
  }
}
