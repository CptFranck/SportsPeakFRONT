import {Component, inject, OnInit} from '@angular/core';
import {ProgExercise} from "../../../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../../../../services/prog-exercise/prog-exercise.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ProgExerciseCardComponent} from "../../../../components/card/prog-exercise-card/prog-exercise-card.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ActionType} from "../../../../enum/action-type";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {
  ProgExerciseCardDetailsComponent
} from "../../../../components/card/prog-exercise-card-details/prog-exercise-card-details.component";
import {
  ProgExerciseModalComponent
} from "../../../explore/prog-exercises/prog-exercise-modal/prog-exercise-modal.component";
import {
  MyProgExerciseModalComponent
} from "../../my-prog-exercises/my-prog-exercise-modal/my-prog-exercise-modal.component";
import {MyProgExerciseDetailsModalComponent} from "../my-prog-exercise-modal/my-prog-exercise-details-modal.component";
import {TargetSetCardComponent} from "../../../../components/card/target-set-card/target-set-card.component";
import {TargetSetModalComponent} from "../target-set-modal/target-set-modal.component";
import {TargetSet} from "../../../../interface/dto/target-set";
import {getUpToDateTargetSets, sortLastTargetSetsByIndex} from "../../../../utils/prog-exercise-functions";
import {Dictionary} from "../../../../interface/utils/dictionary";

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
    TargetSetModalComponent
  ],
  templateUrl: './my-prog-exercise.component.html',
})
export class MyProgExerciseComponent implements OnInit {
  loading: boolean = true;
  targetSets: TargetSet[] = [];
  isLastTargetSet: Dictionary<boolean> = {};
  targetSet: TargetSet | undefined;
  progExercise: ProgExercise | undefined;
  targetSetAction: ActionType = ActionType.update;
  progExerciseAction: ActionType = ActionType.update;
  targetSetModalId: string = "targetSetModalId";
  progExerciseModalId: string = "progExerciseModal";
  targetSetModalTitle: string = "";
  progExerciseModalTitle: string = "";

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private proExerciseService: ProgExerciseService = inject(ProgExerciseService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.proExerciseService.getProgExerciseById(params['id']);
    });
    this.proExerciseService.progExercise.subscribe((progExercise: ProgExercise | undefined) => {
      if (progExercise) {
        this.progExercise = progExercise;
        this.targetSets = getUpToDateTargetSets(progExercise).sort(sortLastTargetSetsByIndex);
        this.targetSets.forEach((targetSet: TargetSet, key: number, array: TargetSet[]) => {
          this.isLastTargetSet[targetSet.id] = (array.length - 1) === key;
        })
      }
    });
    this.proExerciseService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  setProgExercise(formIndicator: FormIndicator) {
    this.progExercise = formIndicator.object;
    this.progExerciseAction = formIndicator.actionType;
    this.progExerciseModalTitle = formIndicator.object.name;
  }

  setTargetSet(formIndicator: FormIndicator) {
    this.targetSet = formIndicator.object;
    this.targetSetAction = formIndicator.actionType;
    this.targetSetModalTitle = "Set N° " + formIndicator.object.index;
  }
}
