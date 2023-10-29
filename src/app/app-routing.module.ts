import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () =>
      import('./modules/sw-characters-game/sw-characters-game.module').then(
        (m) => m.SwCharactersGameModule,
      ),
  },
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
