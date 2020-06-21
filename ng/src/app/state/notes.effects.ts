import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, delay, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import * as NoteActions from './notes.actions';
import {Note} from './notes.reducer';


@Injectable()
export class NotesEffects {

  loadNotes$ = createEffect(() => this.actions$.pipe(
    ofType(NoteActions.loadNotesStart),
    mergeMap(() => this.http.get<Note[]>('notes')
      .pipe(
        map(notes => NoteActions.loadNotesSuccess({notes})),
        catchError(() => of(NoteActions.apiError()))
      ))
    )
  );

  loadNote$ = createEffect(() => this.actions$.pipe(
    ofType(NoteActions.loadNoteStart),
    mergeMap((action) => this.http.get<Note>('notes/' + action.id)
      .pipe(
        map(note => NoteActions.loadNoteSuccess({note})),
        catchError(() => of(NoteActions.apiError()))
      ))
    )
  );

  postNote$ = createEffect(() => this.actions$.pipe(
    ofType(NoteActions.postNoteStart),
    mergeMap((action) => this.http.post<Note>('notes', action.note).pipe(
        map((savedNote) => NoteActions.postNoteSuccess({savedNote})),
        catchError(() => of(NoteActions.apiError()))
      ))
    )
  );

  putNote$ = createEffect(() => this.actions$.pipe(
    ofType(NoteActions.putNoteStart),
    mergeMap((action) => this.http.put<Note>('notes/' + action.note.id, action.note).pipe(
        map(() => NoteActions.putNoteSuccess({savedNote: action.note})),
        catchError(() => of(NoteActions.apiError()))
      ))
    )
  );

  deleteNote$ = createEffect(() => this.actions$.pipe(
    ofType(NoteActions.deleteNoteStart),
    mergeMap((action) => this.http.delete('notes/' + action.note.id).pipe(
        map(() => NoteActions.deleteNoteSuccess({deletedNote: action.note})),
        catchError(() => of(NoteActions.apiError()))
      ))
    )
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
  ) {
  }
}
