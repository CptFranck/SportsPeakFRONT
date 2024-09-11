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
      targetSet {
        id
      }
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
      targetSet {
        id
      }
    }
  }
`;

export const DEL_PERFORMANCE_LOG = gql`
  mutation ($performanceLogId : Int!){
    deletePerformanceLog(performanceLogId: $performanceLogId)
  }
`;
