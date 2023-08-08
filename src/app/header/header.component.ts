import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddToCartService } from '../add-to-cart.service';
import { CommonModule } from '@angular/common';
import { CheckoutDialog } from '../checkout/checkout-dialog.component';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, MatToolbarModule, CheckoutDialog],
  providers: [AddToCartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartService = inject(AddToCartService);
  dialog = inject(MatDialog);

  items$ = this.cartService.counterCart$.pipe(map((num) => num));

  openCartDialog(): void {
    this.dialog.open(CheckoutDialog, {
      height: '800px',
      width: '800px',
    });
  }
}
