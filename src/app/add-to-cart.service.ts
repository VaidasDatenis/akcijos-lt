import { Injectable, computed, signal } from '@angular/core';
import { CartProduct } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  cartListSignal = signal<CartProduct[]>([]);
  countCartLenSignal = computed<number>(() => this.cartListSignal().length);
  totalCartCostSignal = computed(() => {
    return this.cartListSignal().reduce((acc, cur) => acc + Number(cur.price), 0);
  });

  addCartItem(item: CartProduct) {
    this.cartListSignal.mutate((values) => values.push(item));
    localStorage.setItem('cart-products', JSON.stringify(this.cartListSignal()));
  }

  removeFromCart(product: CartProduct) {
    this.cartListSignal.update(() => this.cartListSignal().filter((item) => item !== product));
    localStorage.setItem('cart-products', JSON.stringify(this.cartListSignal()));
  }

  getOldProducts() {
    // see if any old items left after refresh
    const oldCartItems: CartProduct[] = JSON.parse(localStorage.getItem('cart-products') || 'null');
    if (oldCartItems) {
      for (let item of oldCartItems) this.cartListSignal.mutate((values) => values.push(item));
    }
  }

  clearCart() {
    localStorage.removeItem('cart-products');
    this.cartListSignal.mutate((values) => (values.length = 0));
  }
}
