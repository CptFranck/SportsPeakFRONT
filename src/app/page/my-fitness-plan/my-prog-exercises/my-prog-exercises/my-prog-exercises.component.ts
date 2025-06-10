import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ProgExercise} from "../../../../shared/model/dto/prog-exercise";
import {ProgExerciseService} from "../../../../core/services/prog-exercise/prog-exercise.service";
import {FormIndicator} from "../../../../shared/model/common/form-indicator";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {Muscle} from "../../../../shared/model/dto/muscle";
import {MyProgExercisesModalComponent} from "../my-prog-exercise-modal/my-prog-exercises-modal.component";
import {
  ProgExerciseCardComponent
} from "../../../../shared/components/cards/prog-exercise-card/prog-exercise-card.component";
import {Subject, takeUntil} from "rxjs";
import {ActionType} from "../../../../shared/model/enum/action-type";
import {SearchBarComponent} from "../../../../shared/components/search-bar/search-bar.component";

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
    this.progExerciseService.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
    this.progExerciseService.userProgExerciseList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercises: ProgExercise[]) => {
        this.progExercises = progExercises;
        this.displayedProgExercises.set(progExercises)
      });
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
