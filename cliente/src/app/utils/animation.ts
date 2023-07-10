import { trigger, state, style, animate, transition } from '@angular/animations';

export const changeWidth0To100 = trigger('changeWidth0To100', [
    transition(':enter', [
      style({ width: '0%' }),
      animate('1000ms', style({ width: '100%' }))
    ]),
    transition(':leave', [
        style({ width: '100%' }),
      animate('1000ms', style({ width: '0%' }))
    ])
  ])
