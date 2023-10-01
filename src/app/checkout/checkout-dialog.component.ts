import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartProduct, enumMarketsList } from '../product.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddToCartService } from '../add-to-cart.service';

@Component({
  standalone: true,
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['checkout-dialog.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDialog {
  cartService = inject(AddToCartService);
  enumMarketsList = enumMarketsList;

  addOneMore(product: CartProduct) {
    this.cartService.addProductToCart(product);
  }

  removeFromCart(product: CartProduct) {
    this.cartService.removeFromCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
