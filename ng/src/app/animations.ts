import { trigger, state, style, transition, animate } from '@angular/animations';
import {Note} from './state/notes.reducer';

export const Animations = {
  animatedNotes: {},

  fadeSpeed: (n: Note) => {
    return {
     value: '',
     params: { alreadyAnimated: Animations.animatedNotes[n.id] ? '0' : '.5'}
   }},

  hasBeenAnimated: (n: Note) => Animations.animatedNotes[n.id] = true,

  forgetAnimation: (n: Note) => delete Animations.animatedNotes[n.id],

  fade: trigger('fade',
    [
      state('void', style({opacity: 0})),
      transition(':leave', [ animate('{{alreadyAnimated}}s ease-out', style({opacity: 0}))]),
      transition(':enter', [ animate('{{alreadyAnimated}}s ease-out', style({opacity: 1}))])
    ])
}

