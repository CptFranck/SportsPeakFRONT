import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {Visibility} from "../../../../shared/model/enum/visibility";
import {ProgExercisesArrayComponent} from "../prog-exercise-array/prog-exercises-array.component";
import {ProgExerciseModalComponent} from "../prog-exercise-modal/prog-exercise-modal.component";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {Subject, takeUntil} from "rxjs";
import {ActionType} from "../../../../shared/model/enum/action-type";
import {SearchBarComponent} from "../../../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-prog-exercises',
  imports: [
    LoadingComponent,
    SearchBarComponent,
    ProgExercisesArrayComponent,
    ProgExerciseModalComponent
  ],
  templateUrl: './prog-exercises.component.html'
})
export class ProgExercisesComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  displayedProgExercises = signal<ProgExercise[]>([]);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  progExercise = signal<ProgExercise | undefined>(undefined);

  readonly muscleModalId = "progExerciseModal";

  private progExercises: ProgExercise[] = [];

  private readonly unsubscribe$ = new Subject<void>();
  private readonly proExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.proExerciseService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.proExerciseService.progExerciseList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercises: ProgExercise[]) => {
        let publicProgExercise: ProgExercise[] = progExercises.filter((progExercise: ProgExercise) =>
          progExercise.visibility === Visibility.PUBLIC)
        this.progExercises = publicProgExercise;
        this.displayedProgExercises.set(publicProgExercise);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise.set(formIndicator.object);
    this.action.set(formIndicator.actionType);
    this.modalTitle.set(formIndicator.object.name);
  }

  searchProgExercise(input: string) {
    if (input === "")
      return this.displayedProgExercises.set(this.progExercises);
    const localInput = input.toLowerCase();
    this.displayedProgExercises.set(this.filterProgExercises(localInput));
  }

  filterProgExercises(localInput: string) {
    let includeMuscleName = false;
    return this.progExercises.filter((progExercise: ProgExercise) => {
      includeMuscleName = false;
      progExercise.exercise.muscles.forEach((muscle: Muscle) =>
        includeMuscleName = muscle.name.toLowerCase().includes(localInput))

      return progExercise.name.toLowerCase().includes(localInput) ||
        progExercise.note.toLowerCase().includes(localInput) ||
        progExercise.creator.username.toLowerCase().includes(localInput) ||
        progExercise.exercise.name.toLowerCase().includes(localInput) ||
        includeMuscleName;
    });
  }

}
