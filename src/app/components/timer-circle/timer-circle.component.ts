import {Component, input, OnDestroy, OnInit, output, signal} from '@angular/core';

@Component({
  selector: 'app-timer-circle',
  imports: [],
  templateUrl: './timer-circle.component.html',
  styleUrl: './timer-circle.component.css'
})
export class TimerCircleComponent implements OnInit, OnDestroy {

  readonly duration = input.required<number>();
  readonly completed = output<void>();

  countdown = signal<number>(0);
  dashOffset = signal<number>(100);

  private startTime = 0;
  private animationFrameId = 0;
  private countdownIntervalId: any;

  ngOnInit() {
    this.startTime = performance.now();
    this.animate();

    this.countdown.set(this.duration());
    this.countdownIntervalId = setInterval(() => {
      if (this.countdown() > 0)
        return this.countdown.update(value => value - 1);
      clearInterval(this.countdownIntervalId);
      this.completed.emit();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownIntervalId);
    cancelAnimationFrame(this.animationFrameId);
  }

  private animate = () => {
    const now = performance.now();
    const elapsed = (now - this.startTime) / 1000;
    const percent = Math.min((elapsed / this.duration()) * 100, 100);

    this.dashOffset.set(100 - percent);

    if (percent < 100)
      this.animationFrameId = requestAnimationFrame(this.animate);
    else
      this.dashOffset.set(0);
  };
}
