import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusclesArrayComponent} from "../muscles-array/muscles-array.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {MuscleModalComponent} from "../muscle-modal/muscle-modal.component";
import {MuscleService} from "../../../../services/muscle/muscle.service";
import {Muscle} from "../../../../interface/dto/muscle";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Exercise} from "../../../../interface/dto/exercise";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-muscles',
  imports: [
    CommonModule,
    MusclesArrayComponent,
    LoadingComponent,
    MuscleModalComponent,
    SearchBarComponent
  ],
  templateUrl: './muscles.component.html'
})
export class MusclesComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  displayedMuscles = signal<Muscle[]>([]);
  muscle = signal<Muscle | undefined>(undefined);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");

  readonly muscleModalId: string = "muscleModal";

  private muscles: Muscle[] = [];

  private readonly unsubscribe$ = new Subject<void>();
  private readonly muscleService = inject(MuscleService);

  ngOnInit(): void {
    this.muscleService.muscles
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((muscles: Muscle[]) => {
        this.muscles = muscles;
        this.displayedMuscles.set(muscles);
      });
    this.muscleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setMuscle(formIndicator: FormIndicator) {
    this.muscle.set(formIndicator.object);
    this.action.set(formIndicator.actionType);
    if (formIndicator.object === undefined)
      this.modalTitle.set("Add new muscle");
    else
      this.modalTitle.set(formIndicator.object.name);
  }

  searchMuscle(input: string) {
    if (input === "")
      return this.displayedMuscles.set(this.muscles);
    const localInput = input.toLowerCase();
    this.displayedMuscles.set(this.filterMuscles(localInput));
  }

  filterMuscles(localInput: string) {
    let includeExerciseName = false;
    return this.muscles.filter((muscle: Muscle) => {
      includeExerciseName = false;
      muscle.exercises.forEach((exercise: Exercise) => {
        if (exercise.name.toLowerCase().includes(localInput)) {
          includeExerciseName = true;
        }
      })

      return muscle.name.toLowerCase().includes(localInput) ||
        muscle.description.toLowerCase().includes(localInput) ||
        muscle.function.toLowerCase().includes(localInput) ||
        includeExerciseName;
    });

  }
}
