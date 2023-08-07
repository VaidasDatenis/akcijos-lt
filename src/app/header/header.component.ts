import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddToCartService } from '../add-to-cart.service';
import { CommonModule } from '@angular/common';
import { CheckoutDialog } from '../checkout/checkout-dialog.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatToolbarModule, CheckoutDialog],
  providers: [AddToCartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartService = inject(AddToCartService);
  dialog = inject(MatDialog);
  store = inject(Store<{ count: number }>);
  count$: Observable<number>;
  cartProducts = this.cartService.getProducts();

  constructor() {
    this.count$ = this.store.pipe(select('count'));
  }

  checkout(): void {
    this.dialog.open(CheckoutDialog, {
      data: { state: this.cartProducts },
      height: '400px',
      width: '600px',
    });
  }
}
