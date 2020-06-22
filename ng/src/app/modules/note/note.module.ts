import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteRoutingModule} from './note-routing.module';
import {NoteDialogComponent} from './components/note-dialog/note-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {NoteComponent} from './components/note/note.component';

@NgModule({
  declarations: [NoteComponent, NoteDialogComponent],
  imports: [
    CommonModule,
    NoteRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forChild()
  ]
})
export class NoteModule {
}

