import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { CartProduct, Product } from './product.interface';
import { BehaviorSubject, Subject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  cart: CartProduct[] = [];
  counterCart$ = new BehaviorSubject<number>(0);

  addCartItem(item: CartProduct) {
    if (!item) {
      return;
    }
    this.cart.push(item);
    console.log(this.cart.length);
    this.counterCart$.next(this.cart.length);
    localStorage.setItem('cart-products', JSON.stringify(this.cart));
  }

  getOldProducts() {
    // see if any old items left after refresh
    const oldCartItems: CartProduct[] = JSON.parse(localStorage.getItem('cart-products') || 'null');
    if (oldCartItems) {
      for (let item of oldCartItems) this.cart.push(item);
    }
  }

  clearCart() {
    localStorage.removeItem('cart-products');
    this.cart = [];
  }
}
