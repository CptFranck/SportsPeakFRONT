import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {Visibility} from "../../../../interface/enum/visibility";
import {ProgExercisesArrayComponent} from "../prog-exercise-array/prog-exercises-array.component";
import {ProgExerciseModalComponent} from "../prog-exercise-modal/prog-exercise-modal.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {Subject, takeUntil} from "rxjs";

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
    this.proExerciseService.progExercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercises: ProgExercise[]) => {
        let publicProgExercise: ProgExercise[] = progExercises.filter((progExercise: ProgExercise) =>
          progExercise.visibility === Visibility.PUBLIC)
        this.progExercises = publicProgExercise;
        this.displayedProgExercises.set(publicProgExercise);
      });
    this.proExerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
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
