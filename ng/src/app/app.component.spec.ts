import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import * as state from './state/notes.reducer';
import {AppState, notesReducer} from './state/notes.reducer';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {NotesEffects} from './state/notes.effects';
import * as NoteActions from './state/notes.actions';
import {Observable, of, ReplaySubject} from 'rxjs';

export class ApiMockInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    switch (request.url) {
      case 'notes':
        return of(new HttpResponse({body: [{}, {}, {}]}));
      default:
        return of(new HttpResponse());
    }
  }
}

describe('[My notes APP] store tests', () => {

  let store: Store<{app: AppState}>;
  let effects: NotesEffects;

  beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
           HttpClientModule,
          StoreModule.forRoot({app: notesReducer}, {}),
              EffectsModule.forRoot([NotesEffects]),
        ],
        providers: [
          NotesEffects,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiMockInterceptor,
            multi: true
          }
        ]
      });

      effects = TestBed.inject(NotesEffects);

      store = TestBed.inject(Store);
  }));

  it('should set loadingNotes correctly', () => {
    const state1 = notesReducer(state.initialState, NoteActions.loadNotesStart());
    expect(state1.loadingNotes).toBeTrue();

    const state2 = notesReducer(state1, NoteActions.loadNotesSuccess({ notes: [ {id: 1, title: 'Note 1'}, {id: 2, title: 'Note 2'}] }));
    expect(state2.loadingNotes).toBeFalse();
  });

  it('should load 3 notes from mocked API',  done => {
    store.dispatch(NoteActions.loadNotesStart());

    store.select(s => s.app).subscribe(app => {
      if (!app.loadingNotes) {
        expect(app.notes.length).toEqual(3);
        done();
      }
    });
  });
});
