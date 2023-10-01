import { Injectable, computed, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cartQuantitySignal = signal<number>(0);
  isRemoveProductDisabled = computed<boolean>(() => {
    return this.cartQuantitySignal() === 0;
  });

  addCardSingleProduct() {
    if (this.cartQuantitySignal() > 0) {
      this.cartQuantitySignal.update((quantity) => {
        return quantity += 1;
      });
    } else {
      this.cartQuantitySignal.set(1);
    }
  }

  removeFromCardSigngleProduct() {
    if (this.cartQuantitySignal() > 0) {
      this.cartQuantitySignal.update((quantity) => {
        return quantity -= 1;
      });
    }
  }
}
