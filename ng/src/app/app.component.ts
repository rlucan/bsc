import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState, Note} from './state/notes.reducer';
import * as NoteActions from './state/notes.actions';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {MessageBoxService} from './helpers/messasge-box.service';
import {Title} from '@angular/platform-browser';
import {Animations} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ Animations.fade ]
})
export class AppComponent implements OnInit {

  Animations = Animations;

  notes$: Observable<Note[]> = this.store.select(s => s.app.notes);
  loading = true;

  get lang() {
    return this.translate.currentLang;
  }

  get languages() {
    return environment.languages.filter(l => l !== this.lang);
  }

  constructor(private store: Store<{ app: AppState }>,
              private messageBoxService: MessageBoxService,
              private title: Title,
              private translate: TranslateService) {

    this.title.setTitle(this.translate.instant('app.title'));

    this.store.select(s => s.app.loadingNotes).subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(NoteActions.loadNotesStart());
  }

  setLng(lng) {
    localStorage.setItem('bsc:ng:language', lng);
    this.translate.use(lng);
  }

  deleteNote(note: Note) {
    this.messageBoxService.confirm(this.translate.instant('app.realyDelete'), {
      buttons: [{ id: 'yes' }, { id: 'no' }]
    }).subscribe(r => {
      if (r === 'yes') {
        Animations.forgetAnimation(note);
        this.store.dispatch(NoteActions.deleteNoteStart( { note }));
      }
    });
  }
}
