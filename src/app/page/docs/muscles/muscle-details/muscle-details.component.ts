import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
import {Muscle} from "../../../../interface/dto/muscle";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {UserLoggedService} from "../../../../services/user-logged/user-logged.service";

@Component({
  selector: 'app-muscle-details',
  imports: [
    NgForOf,
    NgIf,
    LoadingComponent,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './muscle-details.component.html',
  styleUrl: './muscle-details.component.css'
})
export class MuscleDetailsComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  loading = signal<boolean>(true);
  muscle = signal<Muscle | undefined>(undefined);

  private readonly unsubscribe$ = new Subject<void>();
  private readonly muscleService = inject(MuscleService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userLoggedService = inject(UserLoggedService);

  ngOnInit(): void {
    this.muscleService.muscle
      .subscribe((muscle: Muscle | undefined) => this.muscle.set(muscle))
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => params['id'] !== this.muscle()?.id ? this.muscleService.getMuscleById(params['id']) : null);
    this.muscleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.userLoggedService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
