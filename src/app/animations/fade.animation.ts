import {
    animate,
    style,
    transition,
    trigger,
    state,
    query,
} from '@angular/animations';

export const FadeAnimation = [
    trigger('FadeAnimation', [
        state('in', style({ opacity: 0 })),
        transition(':enter', [style({ opacity: 0 }), animate(100)]),
        transition(':leave', animate(200, style({ opacity: 0 }))),
    ]),
];
