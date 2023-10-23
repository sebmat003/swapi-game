import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      RouterTestingModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      StoreModule.forRoot({}),
    ],
    declarations: [AppComponent],
    detectChanges: false
  });

  beforeEach(() => spectator = createComponent())

  it('Should match snapshot', () => {
    spectator.detectChanges();

    expect(spectator.fixture).toMatchSnapshot();
  });
});
