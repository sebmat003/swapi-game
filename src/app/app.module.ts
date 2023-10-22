import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
