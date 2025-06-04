import {inject, Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MutationResult} from "apollo-angular";
import {
  ADD_PERFORMANCE_LOG,
  DEL_PERFORMANCE_LOG,
  MOD_PERFORMANCE_LOG
} from "../../graphql/operations/performance-log.operations";
import {AlertService} from "../alert/alert.service";
import {PerformanceLog} from "../../../shared/model/dto/performance-log";
import {ApolloWrapperService} from "../apollo-wrapper/apollo-wrapper.service";

@Injectable({
  providedIn: 'root'
})
export class PerformanceLogService {

  private readonly alertService = inject(AlertService);
  private readonly apolloWrapperService = inject(ApolloWrapperService);

  addPerformanceLog(performanceLogForm: FormGroup) {
    const inputValue = performanceLogForm.value;
    inputValue.logDate = new Date(inputValue.logDate);
    this.apolloWrapperService.mutate({
      mutation: ADD_PERFORMANCE_LOG,
      variables: {
        inputNewPerformanceLog: inputValue,
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`This performance log ${data.addPerformanceLog.id} has been successfully created.`);
    });
  }

  modifyPerformanceLog(performanceLogForm: FormGroup) {
    const inputValue = performanceLogForm.value;
    inputValue.logDate = new Date(inputValue.logDate);
    this.apolloWrapperService.mutate({
      mutation: MOD_PERFORMANCE_LOG,
      variables: {
        inputPerformanceLog: inputValue,
      }
    }).subscribe(({errors, data}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`This performance log ${data.modifyPerformanceLog.id} has been successfully updated.`);
    });
  }

  deletePerformanceLog(performanceLog: PerformanceLog) {
    this.apolloWrapperService.mutate({
      mutation: DEL_PERFORMANCE_LOG,
      variables: {
        performanceLogId: performanceLog.id,
      }
    }).subscribe(({errors}: MutationResult) => {
      if (errors)
        this.alertService.graphQLErrorAlertHandler(errors);
      this.alertService.addSuccessAlert(`This performance log ${performanceLog.id} has been successfully deleted.`);
    });
  }
}
