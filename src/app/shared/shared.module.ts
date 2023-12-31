import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { IconComponent } from './components/icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

export const COMPONENTS = [
  LoaderComponent,
  IconComponent,
  ErrorMessageComponent,
];
export const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatSelectModule,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
  exports: [COMPONENTS, MODULES],
})
export class SharedModule {}
