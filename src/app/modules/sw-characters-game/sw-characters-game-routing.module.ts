import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameViewComponent } from './containers/game-view/game-view.component';

const routes: Routes = [
  {
    path: '',
    component: GameViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwCharactersGameRoutingModule {}
