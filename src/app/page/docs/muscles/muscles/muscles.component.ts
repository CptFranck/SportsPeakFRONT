import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  standalone: true,
  imports: [
    CommonModule,
    MusclesArrayComponent,
    LoadingComponent,
    MuscleModalComponent,
    SearchBarComponent
  ],
  templateUrl: './muscles.component.html',
})
export class MusclesComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  muscles: Muscle[] = [];
  displayedMuscles: Muscle[] = [];
  muscle: Muscle | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "muscleModal";
  searchInput: string = "";

  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly muscleService: MuscleService = inject(MuscleService);

  ngOnInit(): void {
    this.muscleService.muscles
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((muscles: Muscle[]) => {
        this.muscles = muscles
        this.updateDisplayedMuscles()
      });
    this.muscleService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) =>
        this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setMuscle(formIndicator: FormIndicator) {
    this.muscle = formIndicator.object;
    this.action = formIndicator.actionType;
    if (formIndicator.object === undefined)
      this.modalTitle = "Add new muscle";
    else
      this.modalTitle = formIndicator.object.name;
  }

  searchMuscle(input: string) {
    this.searchInput = input;
    this.updateDisplayedMuscles();
  }

  updateDisplayedMuscles() {
    if (this.searchInput === "") {
      this.displayedMuscles = this.muscles
      return;
    }

    let localInput: string = this.searchInput.toLowerCase();
    let includeMuscleExerciseName: boolean = false;

    this.displayedMuscles = this.muscles.filter((muscle: Muscle) => {
      includeMuscleExerciseName = false;
      muscle.exercises.forEach((exercise: Exercise) => {
        if (exercise.name.toLowerCase().includes(localInput)) {
          includeMuscleExerciseName = true;
        }
      })

      return muscle.name.toLowerCase().includes(localInput) ||
        muscle.description.toLowerCase().includes(localInput) ||
        muscle.function.toLowerCase().includes(localInput) ||
        includeMuscleExerciseName;
    });
  }
}
