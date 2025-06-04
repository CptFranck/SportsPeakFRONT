import {gql} from "apollo-angular";

export const ADD_PERFORMANCE_LOG = gql`
  mutation ($inputNewPerformanceLog: InputNewPerformanceLog!){
    addPerformanceLog(inputNewPerformanceLog: $inputNewPerformanceLog) {
      id
      setIndex
      repetitionNumber
      weight
      weightUnit
      logDate
    }
  }
`;

export const MOD_PERFORMANCE_LOG = gql`
  mutation ($inputPerformanceLog: InputPerformanceLog!){
    modifyPerformanceLog(inputPerformanceLog: $inputPerformanceLog) {
      id
      setIndex
      repetitionNumber
      weight
      weightUnit
      logDate
    }
  }
`;

export const DEL_PERFORMANCE_LOG = gql`
  mutation ($performanceLogId : ID!){
    deletePerformanceLog(performanceLogId: $performanceLogId)
  }
`;
