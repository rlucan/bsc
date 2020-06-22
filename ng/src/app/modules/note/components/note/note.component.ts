import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AppState} from '@app/state';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogComponent} from '../note-dialog/note-dialog.component';
import * as NoteActions from '@app/state';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private store: Store<{ app: AppState}>) { }

  ngOnInit(): void {

    console.log('initializing NoteComponent');

    if (this.route.snapshot.params.id === 'new') {
      this.store.dispatch(NoteActions.startNewNoteEdit());
    } else {

      this.store.dispatch(NoteActions.loadNoteStart({id: this.route.snapshot.params.id}));

      if (window.location.href.endsWith('/edit')) {
        this.store.dispatch(NoteActions.startNoteEdit());
      }

      this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(e => {
        if ((e as NavigationStart).url.endsWith('/edit')) {
          this.store.dispatch(NoteActions.startNoteEdit());
        } else {
          this.store.dispatch(NoteActions.stopNoteEdit());
        }
      });
    }

    this.dialog.open(NoteDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe(() => {
      this.store.dispatch(NoteActions.stopNoteEdit());
      this.router.navigate(['/']);
    });
  }

}
