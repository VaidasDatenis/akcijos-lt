import { Injectable, computed, signal } from '@angular/core';
import { CartProduct } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  cartListSignal = signal<CartProduct[]>([]);
  countCartLenSignal = computed<number>(() => this.cartListSignal().length);
  totalCartCostSignal = computed(() => {
    return this.cartListSignal().reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
  });

  addProductToCart(item: CartProduct) {
    if (this.cartListSignal().length) {
      // const stupid1 = this.cartListSignal().filter((cartItem) => item.id === cartItem.id); // object
      // const stupid2 = this.cartListSignal().map((cartItem) => item.id === cartItem.id); // true / false
      // console.log(stupid1);
      this.cartListSignal.mutate((cartProducts) => {
        cartProducts.forEach((cartItem) => {
          if (cartItem.id === item.id) {
            // console.log(cartItem.id === item.id);
            cartItem.quantity += 1;
          } else if (cartItem.id !== item.id) {
            // console.log(1);
            cartProducts.push(item);
          }
        });
        return cartProducts;
      });
    } else {
      this.cartListSignal.mutate((cartProducts) => cartProducts.push(item));
    }
    localStorage.setItem('cart-products', JSON.stringify(this.cartListSignal()));
  }

  removeFromCart(product: CartProduct) {
    // this.cartListSignal.update(() => this.cartListSignal().filter((item) => item !== product));
    this.cartListSignal.mutate((cartProducts) => {
      if (cartProducts.length) {
        cartProducts.forEach((cartItem, index) => {
          if (cartItem.id === product.id) {
            cartItem.quantity -= 1;
            if (cartItem.quantity < 1) {
              cartProducts.splice(index, 1);
            }
          }
        });
      }
    });
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
