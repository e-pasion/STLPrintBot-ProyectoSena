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

  export const changeWidth0To1002 = trigger('changeWidth0To1002', [
    state('void', style({
      width: '0'
    })),
    state('*', style({
      width: '100%'
    })),
    transition(':enter, :leave', [
      animate('0.4s')
    ])
  ]);

  export const changeWidth0To40 = trigger('changeWidth0To40', [
    transition(':enter', [
      style({ width: '0%' }),
      animate('1000ms', style({ width: '40%' }))
    ]),
    transition(':leave', [
        style({ width: '40%' }),
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

  export const translate0To100 = trigger('translate0To100', [
    transition(':enter', [
      style({'background-color':'SeaGreen' }),
      animate('5000ms', style({'background-color':'RoyalBlue'}))
    ]),
    transition(':leave', [
        style({'background-color':'RoyalBlue' }),
      animate('5000ms', style({ 'background-color':'SeaGreen' }))
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

  export const changelittleToBig = trigger('changelittleToBig', [
    state('little', style({
      right: "0"
    })),
    state('big', style({
      left: "0"
    })),
    transition('little <=> big', [
      animate('5s ease-in-out')
    ])
  ]);

