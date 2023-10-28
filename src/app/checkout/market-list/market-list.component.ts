import { CommonModule, DecimalPipe, TitleCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, inject } from "@angular/core";
import { AddToCartService } from "src/app/add-to-cart.service";
import { CartProduct } from "src/app/product.interface";

@Component({
  standalone: true,
  selector: 'market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['market-list.component.scss'],
  imports: [CommonModule, TitleCasePipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketListComponent {
  @Input() marketName: string = '';
  cartService = inject(AddToCartService);

  filterListByMarket() {
    return this.cartService.cartListSignal().filter((product) => {
      return product.market === this.marketName;
    })
  }

  addOneMore(product: CartProduct) {
    this.cartService.addProductToCart(product);
  }

  removeFromCart(product: CartProduct) {
    this.cartService.removeFromCart(product);
  }
}
