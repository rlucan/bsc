import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {NoteComponent} from './modules/note/components/note/note.component';
import {AppState} from './state/notes.reducer';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'any'
})
export class HaveNotesLoadedResolver implements Resolve<any> {
  constructor(private store: Store<{ app: AppState }>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((res) => {
      this.store.select(appState => appState.app.loadingNotes).subscribe(loadingNotes => {
        if (!loadingNotes) {
          res(true);
        }
      });
    });
  }
}

const routes: Routes = [
  {
    path: 'note/:id',
    component: NoteComponent,
    loadChildren: () => import('./modules/note/note.module').then(mod => mod.NoteModule),
    resolve: { loaded: HaveNotesLoadedResolver }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
