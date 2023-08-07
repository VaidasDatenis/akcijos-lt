import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { enumMarketsList } from 'src/app/product.interface';

@Component({
  selector: 'app-spec-img',
  templateUrl: 'spec-img.component.html',
  styleUrls: ['spec-img.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecImageComponent {
  @Input()
  specImage!: {
    market?: string;
    spec?: string;
  };
  enumMarketsList = enumMarketsList;
}
