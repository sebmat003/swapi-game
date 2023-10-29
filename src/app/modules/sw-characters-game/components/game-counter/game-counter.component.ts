import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-counter',
  templateUrl: './game-counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCounterComponent implements OnInit, OnDestroy {
  @Input() roundWinner$!: Observable<number>;
  destroy$ = new Subject<void>();
  counter: [number, number] = [0, 0];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.roundWinner$.pipe(takeUntil(this.destroy$)).subscribe((index) => {
      this.counter[index] += 1;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
