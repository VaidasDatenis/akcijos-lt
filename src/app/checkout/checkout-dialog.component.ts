import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { AddToCartService } from '../add-to-cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartProduct, enumMarketsList } from '../product.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['checkout-dialog.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatToolbarModule],
  providers: [AddToCartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDialog {
  cartService = inject(AddToCartService);
  enumMarketsList = enumMarketsList;
  totalCartValue!: number;

  constructor() {
    this.getFromStorage();
  }

  getFromStorage(): CartProduct[] {
    const products: CartProduct[] = JSON.parse(localStorage.getItem('cart-products') || 'null');
    this.totalCartValue = products.reduce((acc, cur) => acc + Number(cur.price), 0);
    return products;
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
