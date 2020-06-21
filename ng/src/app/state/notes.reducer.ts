import { Action, createReducer, on } from '@ngrx/store';
import * as NoteActions from './notes.actions';

export interface Note {
  id: number;
  title: string;
}

export interface AppState {
  loadingNotes: boolean;
  loadingNote: boolean;
  editingNote: boolean;
  savingNote: boolean;
  notes: Note[];
  selectedNote: Note;
}

export const initialState: AppState = {
  loadingNotes: false,
  loadingNote: false,
  editingNote: false,
  savingNote: false,
  notes: [],
  selectedNote: null,
};

const aNotesReducer = createReducer(
  initialState,
  on(NoteActions.loadNotesStart, state => ({ ...state, loadingNotes: true, notes: [] })),
  on(NoteActions.loadNotesSuccess, (state, { notes }) => { /*console.log(notes); */return { ...state, loadingNotes: false, notes }; }),
  on(NoteActions.loadNoteStart, state => ({ ...state, loadingNote: true, selectedNote: null })),
  on(NoteActions.loadNoteSuccess, (state, { note }) => ({ ...state, loadingNote: false, selectedNote: note })),
  on(NoteActions.startNoteEdit, state => ({ ...state, editingNote: true })),
  on(NoteActions.stopNoteEdit, state => ({ ...state, editingNote: false })),
  on(NoteActions.startNewNoteEdit, state => ({ ...state, editingNote: true, selectedNote: { id: 0, title: ''} })),
  on(NoteActions.postNoteStart, (state, { note }) => ({ ...state, selectedNote: note, savingNote: true })),
  on(NoteActions.postNoteSuccess, (state, { savedNote }) =>
    ({ ...state, selectedNote: savedNote, savingNote: false, notes: [...state.notes, savedNote] })),
  on(NoteActions.putNoteStart, (state, { note }) => ({ ...state, selectedNote: note, savingNote: true })),
  on(NoteActions.putNoteSuccess, (state, { savedNote }) =>
    ({...state, selectedNote: savedNote, savingNote: false, notes: state.notes.map(n => n.id === savedNote.id ? savedNote : n)})),
  on(NoteActions.apiError, state => ({ ...state, loadingNote: false, loadingNotes: false, savingNote: false })),
  on(NoteActions.deleteNoteSuccess, (state, { deletedNote }) => ({ ...state, notes: state.notes.filter(n => n.id !== deletedNote.id) })),
);

export function notesReducer(state: AppState | undefined, action: Action) {
  return aNotesReducer(state, action);
}
