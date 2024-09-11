import {inject, Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {
  GET_USER_PROG_EXERCISES,
  MOD_PROG_EXERCISE_TRUST_LABEL
} from "../../graphql/operations/prog-exercise.operations";
import {Apollo, MutationResult} from "apollo-angular";
import {ProgExercise} from "../../interface/dto/prog-exercise";
import {
  ADD_PERFORMANCE_LOG,
  DEL_PERFORMANCE_LOG,
  MOD_PERFORMANCE_LOG
} from "../../graphql/operations/performance-log.operations";
import {AlertService} from "../alert/alert.service";
import {User} from "../../interface/dto/user";
import {UserLoggedService} from "../user-logged/user-logged.service";

@Injectable({
  providedIn: 'root'
})
export class PerformanceLogService {

  private apollo: Apollo = inject(Apollo);
  private alertService: AlertService = inject(AlertService);
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  constructor() {
  }

  addPerformanceLog(progExercisesForm: FormGroup) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user)
      this.apollo.mutate({
        mutation: ADD_PERFORMANCE_LOG,
        variables: {
          inputNewProgExercise: progExercisesForm.value,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe(
        (result: MutationResult): void => {
          if (result.errors) {
            this.alertService.graphQLErrorAlertHandler(result.errors);
          } else {
            let message: string = "Programed exercise " + result.data.addPerformanceLog.name + " been successfully created.";
            this.alertService.addSuccessAlert(message);
          }
        });
    else
      this.alertService.addErrorAlert("User not logged in.");
  }

  modifyPerformanceLog(progExercisesForm: FormGroup) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user)
      this.apollo.mutate({
        mutation: MOD_PERFORMANCE_LOG,
        variables: {
          inputProgExercise: progExercisesForm.value,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + result.data.modifyPerformanceLog.name + " been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("User not logged in.");
  }

  modifyProgExerciseTrustLabel(progExercisesForm: FormGroup) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user)
      this.apollo.mutate({
        mutation: MOD_PROG_EXERCISE_TRUST_LABEL,
        variables: {
          inputProgExerciseTrustLabel: progExercisesForm.value,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + result.data.modifyProgExerciseTrustLabel.name + " been successfully updated.";
          this.alertService.addSuccessAlert(message);
        }
      });
    else
      this.alertService.addErrorAlert("User not logged in.");
  }

  deletePerformanceLog(progExercise: ProgExercise) {
    const user: User | undefined = this.userLoggedService.currentUser.value
    if (user) {
      this.apollo.mutate({
        mutation: DEL_PERFORMANCE_LOG,
        variables: {
          progExerciseId: progExercise.id,
        },
        refetchQueries: [{
          query: GET_USER_PROG_EXERCISES,
          variables: {
            userId: user.id
          }
        }]
      }).subscribe((result: MutationResult): void => {
        if (result.errors) {
          this.alertService.graphQLErrorAlertHandler(result.errors);
        } else {
          let message: string = "Programed exercise " + progExercise.name + " has been successfully deleted.";
          this.alertService.addSuccessAlert(message);
        }
      });
    } else {
      this.alertService.addErrorAlert("User not logged in.");
    }
  }
}
