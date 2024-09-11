import {inject, Injectable} from '@angular/core';
import {Apollo, MutationResult} from "apollo-angular";
import {AlertService} from "../alert/alert.service";
import {FormGroup} from "@angular/forms";
import {
  ADD_TARGET_SET,
  DEL_TARGET_SET,
  MOD_TARGET_SET,
  MOD_TARGET_SET_STATE
} from "../../graphql/operations/target-set.operations";
import {TargetSet} from "../../interface/dto/target-set";
import {ProgExercise} from "../../interface/dto/prog-exercise";
import {ProgExerciseService} from "../prog-exercise/prog-exercise.service";
import {GET_PROG_EXERCISE_BY_ID} from "../../graphql/operations/prog-exercise.operations";

@Injectable({
  providedIn: 'root'
})
export class TargetSetService {

  private progExercise: ProgExercise | undefined;
  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);
  private progExerciseService: ProgExerciseService = inject(ProgExerciseService);

  constructor() {
    this.progExerciseService.progExercise.subscribe((progExercise: ProgExercise | undefined) => {
      if (progExercise)
        this.progExercise = progExercise;
    })
  }

  addTargetSet(targetSetForm: FormGroup) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: ADD_TARGET_SET,
        variables: {
          inputNewTargetSet: targetSetForm.value,
        },
        refetchQueries: [{
          query: GET_PROG_EXERCISE_BY_ID,
          variables: {
            id: this.progExercise.id
          }
        }]
      }).subscribe(
        (result: MutationResult): void => {
          if (result.errors) {
            this.alertService.graphQLErrorAlertHandler(result.errors);
          } else {
            let message: string = "Set " + result.data.addTargetSet.index + " been successfully created.";
            this.alertService.addSuccessAlert(message);
          }
        });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }

  modifyTargetSet(targetSetForm: FormGroup) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: MOD_TARGET_SET,
        variables: {
          inputTargetSet: targetSetForm.value,
        },
        refetchQueries: [{
          query: GET_PROG_EXERCISE_BY_ID,
          variables: {
            id: this.progExercise.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Set " + result.data.modifyTargetSet.index + " been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }

  modifyTargetSetState(targetSetStateForm: FormGroup) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: MOD_TARGET_SET_STATE,
        variables: {
          inputTargetSetState: targetSetStateForm.value,
        },
        refetchQueries: [{
          query: GET_PROG_EXERCISE_BY_ID,
          variables: {
            id: this.progExercise.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Set state been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }

  deleteTargetSet(targetSet: TargetSet) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: DEL_TARGET_SET,
        variables: {
          targetSetId: targetSet.id,
        },
        refetchQueries: [{
          query: GET_PROG_EXERCISE_BY_ID,
          variables: {
            id: this.progExercise.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Set " + targetSet.index + " has been successfully deleted.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }
}
