import { createAction, props } from '@ngrx/store';
import {Note} from './notes.reducer';

export const loadNotesStart = createAction('Load Notes Start');
export const loadNotesSuccess = createAction('Load Notes Success', props<{ notes: Note[] }>());
export const loadNoteStart = createAction('Load Note', props<{ id: number }>());
export const loadNoteSuccess = createAction('Load Note Success', props<{ note: Note }>());
export const startNoteEdit = createAction('Start Note Edit');
export const stopNoteEdit = createAction('Stop Note Edit');
export const startNewNoteEdit = createAction('Start New Note Edit');
export const putNoteStart = createAction('Put Note Start', props<{ note: Note }>());
export const putNoteSuccess = createAction('Put Note Success', props<{ savedNote: Note }>());
export const postNoteStart = createAction('Post Note Start', props<{ note: Note }>());
export const postNoteSuccess = createAction('Post Note Success', props<{ savedNote: Note }>());
export const deleteNoteStart = createAction('Delete Note Start', props<{ note: Note }>());
export const deleteNoteSuccess = createAction('Delete Note Success', props<{ deletedNote: Note }>());

export const apiError = createAction('API Error');
