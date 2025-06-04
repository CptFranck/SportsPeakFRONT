import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {MyProgExercisesModalComponent} from "../my-prog-exercise-modal/my-prog-exercises-modal.component";
import {
  ProgExerciseCardComponent
} from "../../../../components/card/prog-exercise/prog-exercise-card/prog-exercise-card.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-my-prog-exercises',
  imports: [
    LoadingComponent,
    SearchBarComponent,
    MyProgExercisesModalComponent,
    ProgExerciseCardComponent,
  ],
  templateUrl: './my-prog-exercises.component.html'
})
export class MyProgExercisesComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  displayedProgExercises = signal<ProgExercise[]>([]);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  progExercise = signal<ProgExercise | undefined>(undefined);

  readonly progExerciseModalId = "progExerciseModal";

  private progExercises: ProgExercise[] = [];

  private readonly unsubscribe$ = new Subject<void>();
  private readonly progExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.progExerciseService.userProgExercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercises: ProgExercise[]) => {
        this.progExercises = progExercises;
        this.displayedProgExercises.set(progExercises)
      });
    this.progExerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.action.set(formIndicator.actionType);
    this.progExercise.set(formIndicator.object);
    if (formIndicator.object === undefined)
      this.modalTitle.set("Add new programed exercise");
    else
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
        progExercise.exercise.name.toLowerCase().includes(localInput) ||
        includeMuscleName;
    })
  }
}
