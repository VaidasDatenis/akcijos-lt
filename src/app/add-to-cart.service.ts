import { Injectable, computed, signal } from '@angular/core';
import { CartProduct, enumMarketsList } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  cartListSignal = signal<CartProduct[]>([]);
  countCartLenSignal = computed(() => {
    return this.cartListSignal().reduce((acc, cur) => acc + cur.quantity, 0);
  });
  totalCartCostSignal = computed(() => {
    return this.cartListSignal().reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
  });

  getProductQuantityById(id: string) {
    if (this.cartListSignal().length) {
      const item = this.cartListSignal().find(x => x.id === id);
      return item?.quantity;
    }
    return 0;
  }

  getProductPriceByQuantity(id: string) {
    const item = this.cartListSignal().find(x => x.id === id);
    if (item?.price && item?.quantity) {
      return Number(item.price) * item.quantity;
    }
    return null;
  }

  addProductToCart(item: CartProduct) {
    this.cartListSignal.mutate((cartProducts) => {
      if (cartProducts.length) {
        const itemFound = cartProducts.find(product => product.id === item.id)
        if (itemFound) {
          itemFound.quantity += 1;
        } else {
          cartProducts.push(item);
        }
      } else {
        cartProducts.push(item);
      }
    });
    localStorage.setItem('cart-products', JSON.stringify(this.cartListSignal()));
  }

  removeFromCart(product: CartProduct) {
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
