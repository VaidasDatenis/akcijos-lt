import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from 'src/app/product.interface';
import { SpecImageComponent } from '../spec-img/spec-img.component';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Decrement, Increment, Reset } from 'src/app/counter.actions';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  standalone: true,
  imports: [CommonModule, SpecImageComponent, MatCardModule, MatProgressSpinnerModule, MatTooltipModule],
  providers: [AddToCartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  cartService = inject(AddToCartService);
  store = inject(Store<{ count: number }>);
  @Input()
  product!: Product;

  constructor() {}

  addToCart(product: Product) {
    this.store.dispatch(new Increment());
    const { priceEur, priceCents } = product;
    this.cartService.addCartItem({
      ...product,
      price: this.transformPrices(priceEur, priceCents),
    });
  }

  transformPrices(euroValue: string | undefined, centValue: string | undefined) {
    if (!euroValue && !centValue) {
      return '';
    }
    let newCents = centValue?.replaceAll('€/vnt.', '');
    let newCents2 = newCents?.replaceAll('€/kg', '');
    let newCents3 = newCents2?.replaceAll('€', '').replace(/\s/g, '');
    return `${euroValue},${newCents3}`;
  }

  transformDateTo(dateTo: string | undefined) {
    const transDate = dateTo?.replace('Pasiūlymas galioja', '');
    return `${transDate}`;
  }
}
