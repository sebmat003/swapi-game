import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./components/loader/loader.component";
import { IconComponent } from './components/icon/icon.component';

export const COMPONENTS = [LoaderComponent];
export const MODULES = [CommonModule];

@NgModule({
  declarations: [...COMPONENTS, IconComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS, IconComponent]
})
export class SharedModule {
}
