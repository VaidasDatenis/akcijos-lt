import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from 'src/app/product.interface';
import { SpecImageComponent } from '../spec-img/spec-img.component';
import { transformDateTo, transformPrices } from '../../utils';
import { CardService } from 'src/app/card.service';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  imports: [CommonModule, SpecImageComponent, MatCardModule, MatProgressSpinnerModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  cardService = inject(CardService);
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

  transformDateToUtil(dateTo: string | undefined) {
    return transformDateTo(dateTo);
  }

  transformPricesUtil(priceEur: string | undefined, prieCent: string | undefined) {
    return transformPrices(priceEur, prieCent);
  }
}
