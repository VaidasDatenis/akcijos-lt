import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CheckoutDialog } from '../../checkout/checkout-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddToCartService } from '../../add-to-cart.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatToolbarModule, CheckoutDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartService = inject(AddToCartService);
  dialog = inject(MatDialog);
  @Input() cartLength = 0;

  openCartDialog(): void {
    this.dialog.open(CheckoutDialog, {
      width: '90%',
    });
  }
}
