import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../enum/action-type";
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../docs/muscles/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../docs/muscles/muscles-array/muscles-array.component";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {Visibility} from "../../../../interface/enum/visibility";
import {ProgExercisesArrayComponent} from "../prog-exercise-array/prog-exercises-array.component";
import {ProgExerciseModalComponent} from "../prog-exercise-modal/prog-exercise-modal.component";
import {Muscle} from "../../../../interface/dto/muscle";

@Component({
  selector: 'app-prog-exercises',
  standalone: true,
  imports: [
    LoadingComponent,
    MuscleModalComponent,
    MusclesArrayComponent,
    SearchBarComponent,
    ProgExercisesArrayComponent,
    ProgExerciseModalComponent
  ],
  templateUrl: './prog-exercises.component.html',
})
export class ProgExercisesComponent implements OnInit {
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
    this.proExerciseService.progExercises.subscribe((progExercises: ProgExercise[]) => {
      let publicProgExercise: ProgExercise[] = progExercises.filter((progExercise: ProgExercise) =>
        progExercise.visibility === Visibility.PUBLIC)
      this.progExercises = publicProgExercise;
      this.displayedProgExercises = publicProgExercise;
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
        progExercise.creator.username.toLowerCase().includes(localInput) ||
        progExercise.exercise.name.toLowerCase().includes(localInput) ||
        includeMuscleExerciseName;
    });
  }
}
