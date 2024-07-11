import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ActionType} from "../../../../enum/action-type";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {
  ProgExerciseModalComponent
} from "../../../explore/prog-exercises/prog-exercise-modal/prog-exercise-modal.component";
import {
  ProgExercisesArrayComponent
} from "../../../explore/prog-exercises/prog-exercise-array/prog-exercises-array.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {Muscle} from "../../../../interface/dto/muscle";
import {MyProgExercisesArrayComponent} from "../my-prog-exercises-array/my-prog-exercises-array.component";
import {MyProgExerciseModalComponent} from "../my-prog-exercise-modal/my-prog-exercise-modal.component";

@Component({
  selector: 'app-my-prog-exercises',
  standalone: true,
  imports: [
    LoadingComponent,
    ProgExerciseModalComponent,
    ProgExercisesArrayComponent,
    SearchBarComponent,
    MyProgExercisesArrayComponent,
    MyProgExerciseModalComponent
  ],
  templateUrl: './my-prog-exercises.component.html',
})
export class MyProgExercisesComponent implements OnInit {
  loading: boolean = true;
  progExercises: ProgExercise[] = [];
  displayedProgExercises: ProgExercise[] = [];
  progExercise: ProgExercise | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "progExerciseModal";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private proExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.proExerciseService.userProgExercises.subscribe((progExercises: ProgExercise[]) => {
      this.progExercises = progExercises;
      this.displayedProgExercises = progExercises;
    });
    this.proExerciseService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.name;
  }

  searchProgExercise(input: string) {
    if (input === "") {
      this.displayedProgExercises = this.progExercises
      return;
    }

    let localInput: string = input.toLowerCase();
    let includeMuscleExerciseName: boolean = false;

    this.displayedProgExercises = this.progExercises.filter((progExercise: ProgExercise) => {
      includeMuscleExerciseName = false;

      progExercise.exercise.muscles.forEach((muscle: Muscle) =>
        includeMuscleExerciseName = muscle.name.toLowerCase().includes(localInput))

      return progExercise.name.toLowerCase().includes(localInput) ||
        progExercise.note.toLowerCase().includes(localInput) ||
        progExercise.exercise.name.toLowerCase().includes(localInput) ||
        includeMuscleExerciseName;
    });
  }
}
