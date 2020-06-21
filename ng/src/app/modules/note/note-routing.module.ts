import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteComponent} from './components/note/note.component';

const routes: Routes = [
  // { path: '', component: NoteComponent },
  { path: ':id', component: NoteComponent },
  { path: ':id/edit', component: NoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }

