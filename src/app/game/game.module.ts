import { NgModule } from '@angular/core';
import { GameViewComponent } from "./containers/game-view/game-view.component";
import { CommonModule } from "@angular/common";
import { GameRoutingModule } from "./game-routing.module";
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameCounterComponent } from './components/game-counter/game-counter.component';
import { SharedModule } from "../shared/shared.module";
import { GameOptionsComponent } from './components/game-options/game-options.component';
import { StoreModule } from "@ngrx/store";
import { featureKey, reducer } from "./store/reducers/game.reducers";
import { EffectsModule } from "@ngrx/effects";
import { GameEffects } from "./store/effects/game.effects";
import { GameHttpService } from "./store/services/game-http.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [GameViewComponent, GameCardComponent, GameCounterComponent, GameOptionsComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([GameEffects]),
    HttpClientModule
  ],
  providers: [GameHttpService]
})
export class GameModule {
}
