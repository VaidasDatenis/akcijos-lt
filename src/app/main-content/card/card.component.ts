import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Product } from 'src/app/product.interface';
import { SpecImageComponent } from '../spec-img/spec-img.component';
import { AddToCartService } from 'src/app/add-to-cart.service';
import { transformPrices } from '../../utils';

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
  @Input()
  product!: Product;
  @Output() emitAddEvent: EventEmitter<Product> = new EventEmitter();
  transformPrices = transformPrices;

  addToCart(product: Product) {
    this.emitAddEvent.emit(product);
  }

  transformDateTo(dateTo: string | undefined) {
    const transDate = dateTo?.replace('Pasiūlymas galioja', '');
    return `${transDate}`;
  }
}
