import { Injectable, computed, inject, signal } from '@angular/core';
import { CartProduct } from './product.interface';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  cardService = inject(CardService);
  cartListSignal = signal<CartProduct[]>([]);
  countCartLenSignal = computed(() => {
    return this.cartListSignal().reduce((acc, cur) => acc + cur.quantity, 0);
  });
  totalCartCostSignal = computed(() => {
    return this.cartListSignal().reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
  });

  addProductToCart(item: CartProduct) {
    this.cardService.addCardSingleProduct();
    if (this.cartListSignal().length) {
      if (this.cartListSignal().find(product => product.id === item.id)) {
        this.cartListSignal.mutate((cartProducts) => {
          for (const cartItem of cartProducts) {
            cartItem.quantity += 1;
          };
        });
      } else {
        this.cartListSignal().push(item);
      }
    } else {
      this.cartListSignal().push(item);
    }
    console.log(this.countCartLenSignal());
    localStorage.setItem('cart-products', JSON.stringify(this.cartListSignal()));
  }

  removeFromCart(product: CartProduct) {
    this.cardService.removeFromCardSigngleProduct();
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
    this.cardService.cartQuantitySignal.set(0);
  }
}
