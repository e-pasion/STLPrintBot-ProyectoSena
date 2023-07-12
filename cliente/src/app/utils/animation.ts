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

  export const opacity0To100 = trigger('opacity0To100', [
    transition(':enter', [
      style({ opacity: '0' }),
      animate('500ms', style({ opacity: '1' }))
    ]),
    transition(':leave', [
        style({ opacity: '1' }),
      animate('500ms', style({ opacity: '0' }))
    ])
  ])


  export const changeTranslate0To100 = trigger('changeTranslate0To100', [
    state('loginOpen',style({
      transform: 'translateX(0px)',
      'background-color':'SeaGreen'
    })),
    state('registerOpen',style({
      transform: 'translateX(100%)',
      'background-color':'RoyalBlue'
      
    })),
    transition('loginOpen<=>registerOpen',[
      animate('0.5s')
    ])
  ])
