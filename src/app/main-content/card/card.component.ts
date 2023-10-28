import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from 'src/app/product.interface';
import { SpecImageComponent } from '../spec-img/spec-img.component';
import { transformDateTo, transformPrices } from '../../utils';
import { AddToCartService } from 'src/app/add-to-cart.service';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  imports: [CommonModule, SpecImageComponent, MatCardModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  cartService = inject(AddToCartService);
  @Input() product!: Product;
  @Input() marketName!: string;
  @Output() emitAddEvent = new EventEmitter<Product>();
  @Output() emitRemoveEvent = new EventEmitter<Product>();

  addToCart(product: Product) {
    this.emitAddEvent.emit(product);
  }

  removeFromCart(product: Product) {
    this.emitRemoveEvent.emit(product);
  }

  transformDateToUtil(dateTo: string) {
    return transformDateTo(dateTo);
  }

  transformPricesUtil(priceEur: string, prieCent: string) {
    return transformPrices(priceEur, prieCent);
  }
}
