import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../interface/enum/action-type";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {
  ProgExerciseCardDetailsComponent
} from "../../../../components/card/prog-exercise/prog-exercise-card-details/prog-exercise-card-details.component";
import {
  MyProgExerciseDetailsModalComponent
} from "../my-prog-exercise-details-modal/my-prog-exercise-details-modal.component";
import {TargetSetModalComponent} from "../my-prog-exercise-target-sets/target-set-modal/target-set-modal.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {Subject, takeUntil} from "rxjs";
import {TargetSetsComponent} from "../my-prog-exercise-target-sets/target-sets/target-sets.component";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {
  PerformanceLogModalComponent
} from "../my-prog-exercise-performance-logs/performance-log-modal/performance-log-modal.component";

@Component({
  selector: 'app-my-prog-exercise',
  imports: [
    NgIf,
    LoadingComponent,
    ProgExerciseCardDetailsComponent,
    MyProgExerciseDetailsModalComponent,
    TargetSetModalComponent,
    TargetSetsComponent,
    PerformanceLogModalComponent
  ],
  templateUrl: './my-prog-exercise.component.html'
})
export class MyProgExerciseComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  
  progExercise = signal<ProgExercise | undefined>(undefined);
  progExerciseAction = signal<ActionType>(ActionType.update);
  progExerciseModalTitle = signal<string>("");
  progExerciseModalId: string = "progExerciseModal";

  targetSet = signal<TargetSet | undefined>(undefined);
  targetSetAction = signal<ActionType>(ActionType.update);
  targetSetModalTitle = signal<string>("");
  targetSetModalId: string = "targetSetModalId";

  performanceLog = signal<PerformanceLog | undefined>(undefined);
  performanceLogAction = signal<ActionType>(ActionType.update);
  performanceLogModalTitle = signal<string>("");
  performanceLogModalId: string = "performanceLogModalId";

  private readonly unsubscribe$ = new Subject<void>();
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly proExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.proExerciseService.progExercise
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((progExercise: ProgExercise | undefined) => {
        if (progExercise) {
          this.progExercise.set(progExercise);
          const currentTargetSet = this.targetSet()
          if (currentTargetSet) {
            this.targetSet.set(
              progExercise.targetSets.find((targetSet: TargetSet) => currentTargetSet?.id === targetSet.id));
          }
        }
      });
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        if (params['id'] !== this.progExercise()?.id)
          this.proExerciseService.getProgExerciseById(params['id']);
      });
    this.proExerciseService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) =>
        this.loading.set(isLoading));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise.set(formIndicator.object);
    this.progExerciseAction.set(formIndicator.actionType);
    this.progExerciseModalTitle.set(formIndicator.object.name);
  }

  setTargetSet(formIndicator: FormIndicator) {

    this.targetSetAction.set(formIndicator.actionType);
    if (formIndicator.actionType === ActionType.create) {
      this.targetSetModalTitle.set("Add new set's step");
      this.targetSet.set(undefined);
    } else if (formIndicator.actionType === ActionType.addEvolution) {
      this.targetSetModalTitle.set("Add evolution to set's step N°" + formIndicator.object.index);
      this.targetSet.set(formIndicator.object);
    } else {
      this.targetSetModalTitle.set("Set's step N° " + formIndicator.object.index);
      this.targetSet.set(formIndicator.object);
    }
  }

  setPerformanceLog(formIndicator: FormIndicator) {
    this.performanceLogAction.set(formIndicator.actionType);
    if (formIndicator.actionType === ActionType.create) {
      this.targetSet.set(formIndicator.object);
      this.performanceLog.set(undefined);
      this.performanceLogModalTitle.set("Add new performance log");
    } else if (formIndicator.actionType === ActionType.checkPerformance) {
      this.targetSet.set(formIndicator.object);
      this.performanceLog.set(undefined);
      this.performanceLogModalTitle.set("Check step N° " + this.targetSet()?.index + " performances");
    } else {
      this.targetSet.set(undefined);
      this.performanceLog.set(formIndicator.object);
      this.performanceLogModalTitle.set("Performance log of set N° " + formIndicator.object.setIndex +
        " the " + formIndicator.object.logDate.substring(0, 10));
    }
  }
}
