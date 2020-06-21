import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppState, Note} from '../../../../state/notes.reducer';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as NoteActions from '../../../../state/notes.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss']
})
export class NoteDialogComponent {

  note: Note;

  loading = true;
  editing = false;
  saving = false;

  noteFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<NoteDialogComponent>,
              private store: Store<{ app: AppState}>,
              private router: Router,
              private fb: FormBuilder) {

    this.store.select(state => state.app.loadingNote).subscribe(loading => this.loading = loading);

    this.store.select(state => state.app.selectedNote).subscribe(note => {
      this.note = note;
      if (note) {
        this.noteFormGroup = fb.group(note);
        this.noteFormGroup.get('title').setValidators(Validators.required);
        this.store.select(state => state.app.editingNote).subscribe(editing => {
          this.editing = editing;
          editing ? this.noteFormGroup.enable() : this.noteFormGroup.disable();
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  back() {
    this.noteFormGroup.patchValue(this.note);
    this.router.navigate([ '/note/' + this.note.id ]);
  }

  save() {
    this.noteFormGroup.markAllAsTouched();
    if (this.noteFormGroup.valid) {
      if (this.note.id === 0) {
        this.store.dispatch(NoteActions.postNoteStart(  { note: this.noteFormGroup.value }));
      } else {
        this.store.dispatch(NoteActions.putNoteStart({note: this.noteFormGroup.value}));
      }
      this.store.select(state => state.app.savingNote).subscribe(saving => {
        this.saving = saving;
        if (!saving) {
          this.dialogRef.close();
        }
      });
    }
  }

}
