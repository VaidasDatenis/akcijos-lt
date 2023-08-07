import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AddToCartService } from '../add-to-cart.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartProduct } from '../product.interface';

@Component({
  standalone: true,
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule],
  providers: [AddToCartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDialog {
  cartService = inject(AddToCartService);
  products: CartProduct[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.products = this.cartService.getProducts();
  }
}
