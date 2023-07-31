import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, combineLatest } from "rxjs";
import { FirebaseService } from "src/app/firebase.service";
import { Product } from "src/app/product.interface";

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  // standalone: true,
  // imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  firestoreService = inject(FirebaseService);
  @Input() product: Product | undefined;

  ngOnInit(): void { }
}
