import {Component, inject, OnDestroy, OnInit, signal, TemplateRef, ViewChild} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../interface/enum/action-type";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {MyProgExercisesModalComponent} from "../my-prog-exercise-modal/my-prog-exercises-modal.component";
import {NgForOf} from "@angular/common";
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
    NgForOf,
    ProgExerciseCardComponent,
  ],
  templateUrl: './my-prog-exercises.component.html'
})
export class MyProgExercisesComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  progExercises: ProgExercise[] = [];
  displayedProgExercises = signal<ProgExercise[]>([]);

  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  progExercise = signal<ProgExercise | undefined>(undefined);
  readonly progExerciseModalId = "progExerciseModal";
  searchInput = "";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private readonly unsubscribe$ = new Subject<void>();
  private readonly progExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.progExerciseService.userProgExercises
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercises: ProgExercise[]) => {
        this.progExercises = progExercises;
        this.updateDisplayedProgExercise();
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
    this.modalTitle.set(formIndicator.object.name);
    this.progExercise.set(formIndicator.object);
  }

  searchProgExercise(input: string) {
    this.searchInput = input;
    this.updateDisplayedProgExercise();
  }

  updateDisplayedProgExercise() {
    const localInput = this.searchInput.toLowerCase();
    if (this.searchInput === "") {
      this.displayedProgExercises.set(this.progExercises);
      return;
    }
    const exercisesFiltered = this.filterProgExercises(localInput);
    this.displayedProgExercises.set(exercisesFiltered);
  }

  filterProgExercises(localInput: string) {
    let includeMuscleExerciseName = false;
    return this.progExercises.filter((progExercise: ProgExercise) => {
      includeMuscleExerciseName = false;

      progExercise.exercise.muscles.forEach((muscle: Muscle) =>
        includeMuscleExerciseName = muscle.name.toLowerCase().includes(localInput))

      return progExercise.name.toLowerCase().includes(localInput) ||
        progExercise.note.toLowerCase().includes(localInput) ||
        progExercise.exercise.name.toLowerCase().includes(localInput) ||
        includeMuscleExerciseName;
    })
  }
}
