import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export class Animations {
  static page = [
    trigger('detailEnterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s', style({ opacity: 0 }))
      ])
    ])
  ];
}
