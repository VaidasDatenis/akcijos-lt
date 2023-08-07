import { Injectable } from '@angular/core';
import { CartProduct, Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  // https://stackblitz.com/edit/angular-simple-rxjs-shopping-cart-example-bz7y9d?file=src%2Ftheme.scss,src%2Fapp%2Fshopping-cart.service.ts
  cart: CartProduct[] = [];
  // count: WritableSignal<number> = signal(0);

  addCartItem(item: CartProduct) {
    // this.count.mutate()
    // localStorage.removeItem('cart-products');
    // localStorage.setItem('cart-products', JSON.stringify(this.cart));
  }

  getProducts() {
    return this.cart;
  }
}
