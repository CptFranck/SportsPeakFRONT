import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {
  ProgExerciseCardComponent
} from "../../../../components/card/prog-exercise/prog-exercise-card/prog-exercise-card.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {
  ProgExerciseCardDetailsComponent
} from "../../../../components/card/prog-exercise/prog-exercise-card-details/prog-exercise-card-details.component";
import {
  ProgExerciseModalComponent
} from "../../../explore/prog-exercises/prog-exercise-modal/prog-exercise-modal.component";
import {
  MyProgExerciseModalComponent
} from "../../my-prog-exercises/my-prog-exercise-modal/my-prog-exercise-modal.component";
import {
  MyProgExerciseDetailsModalComponent
} from "../my-prog-exercise-details-modal/my-prog-exercise-details-modal.component";
import {TargetSetCardComponent} from "../../../../components/card/target-set/target-set-card/target-set-card.component";
import {TargetSetModalComponent} from "../my-prog-exercise-target-sets/target-set-modal/target-set-modal.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {Subject, takeUntil} from "rxjs";
import {TargetSetsComponent} from "../my-prog-exercise-target-sets/target-sets/target-sets.component";
import {PerformanceLog} from "../../../../interface/dto/performance-log";

@Component({
  selector: 'app-my-prog-exercise',
  standalone: true,
  imports: [
    NgForOf,
    ProgExerciseCardComponent,
    NgIf,
    LoadingComponent,
    ProgExerciseCardDetailsComponent,
    ProgExerciseModalComponent,
    MyProgExerciseModalComponent,
    MyProgExerciseDetailsModalComponent,
    TargetSetCardComponent,
    TargetSetModalComponent,
    TargetSetsComponent
  ],
  templateUrl: './my-prog-exercise.component.html',
})
export class MyProgExerciseComponent implements OnInit, OnDestroy {
  loading: boolean = true;

  progExercise: ProgExercise | undefined;
  progExerciseAction: ActionType = ActionType.update;
  progExerciseModalId: string = "progExerciseModal";
  progExerciseModalTitle: string = "";

  targetSet: TargetSet | undefined;
  targetSetAction: ActionType = ActionType.update;
  targetSetModalId: string = "targetSetModalId";
  targetSetModalTitle: string = "";

  performanceLog: PerformanceLog | undefined;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private proExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        this.proExerciseService.getProgExerciseById(params['id']);
      });
    this.proExerciseService.progExercise
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercise: ProgExercise | undefined) => {
        if (progExercise) {
          this.progExercise = progExercise;
        }
      });
    this.proExerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) =>
        this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise = formIndicator.object;
    this.progExerciseAction = formIndicator.actionType;
    this.progExerciseModalTitle = formIndicator.object.name;
  }

  setTargetSet(formIndicator: FormIndicator) {
    this.targetSet = formIndicator.object;
    this.performanceLog = undefined;
    this.targetSetAction = formIndicator.actionType;

    if (formIndicator.object === undefined)
      this.targetSetModalTitle = "Add new set's step";
    else if (formIndicator?.complement === true)
      this.targetSetModalTitle = "Add new performance log";
    else if (formIndicator.actionType === ActionType.addEvolution)
      this.targetSetModalTitle = "Add evolution to set's step N°" + formIndicator.object.index;
    else
      this.targetSetModalTitle = "Set's step N° " + formIndicator.object.index;
  }

  setPerformanceLog(formIndicator: FormIndicator) {
    this.targetSet = undefined;
    this.performanceLog = formIndicator.object;
    this.targetSetAction = formIndicator.actionType;
    this.targetSetModalTitle = "Performance log of set N° " + formIndicator.object.setIndex +
      " the " + formIndicator.object.logDate.substring(0, 10);
  }
}
