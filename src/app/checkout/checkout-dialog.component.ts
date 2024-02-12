import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MarketListEnum } from '../product.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddToCartService } from '../add-to-cart.service';
import { MarketListComponent } from './market-list/market-list.component';

@Component({
  standalone: true,
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['checkout-dialog.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatToolbarModule, MarketListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDialog {
  cartService = inject(AddToCartService);
  marketList = MarketListEnum;

  checkForMarketsInList(marketName: string) {
    return this.cartService.cartListSignal().find((product) => {
      return product.market === marketName;
    })
  }
}
