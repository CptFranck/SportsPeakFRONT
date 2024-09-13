import {inject, Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {GET_PROG_EXERCISE_BY_ID} from "../../graphql/operations/prog-exercise.operations";
import {Apollo, MutationResult} from "apollo-angular";
import {ProgExercise} from "../../interface/dto/prog-exercise";
import {
  ADD_PERFORMANCE_LOG,
  DEL_PERFORMANCE_LOG,
  MOD_PERFORMANCE_LOG
} from "../../graphql/operations/performance-log.operations";
import {AlertService} from "../alert/alert.service";
import {ProgExerciseService} from "../prog-exercise/prog-exercise.service";
import {PerformanceLog} from "../../interface/dto/performance-log";

@Injectable({
  providedIn: 'root'
})
export class PerformanceLogService {

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

  addPerformanceLog(performanceLogForm: FormGroup) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: ADD_PERFORMANCE_LOG,
        variables: {
          inputNewPerformanceLog: performanceLogForm.value,
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
            let message: string = "This performance log " + result.data.addPerformanceLog.id + " has been successfully created.";
            this.alertService.addSuccessAlert(message);
          }
        });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }

  modifyPerformanceLog(performanceLogForm: FormGroup) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: MOD_PERFORMANCE_LOG,
        variables: {
          inputPerformanceLog: performanceLogForm.value,
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
          let message: string = "This performance log " + result.data.modifyPerformanceLog.id + "has been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }

  deletePerformanceLog(performanceLog: PerformanceLog) {
    if (this.progExercise)
      this.apollo.mutate({
        mutation: DEL_PERFORMANCE_LOG,
        variables: {
          performanceLogId: performanceLog.id,
        },
        refetchQueries: [{
          query: GET_PROG_EXERCISE_BY_ID,
          variables: {
            id: performanceLog.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "This  performance log " + performanceLog.id + "has been successfully deleted.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("Programed exercise is undefined !");
  }
}
