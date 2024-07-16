import {gql} from "apollo-angular";

export const ADD_TARGET_SET = gql`
  mutation ($inputNewTargetSet: InputNewTargetSet!){
    addTargetSet(inputNewTargetSet: $inputNewTargetSet) {
      id
      setNumber
      repetitionNumber
      weight
      weightUnit
      physicalExertionUnitTime{
        hours
        minutes
        seconds
      }
      restTime{
        hours
        minutes
        seconds
      }
      targetSetUpdate {
        id
      }
      performanceLogs {
        id
        setIndex
        repetitionNumber
        weight
        weightUnit
        logDate
      }
    }
  }
`;

export const ADD_TARGET_SET_EVOLUTION = gql`
  mutation ($inputNewTargetSet: InputNewTargetSet!){
    addTargetSet(inputNewTargetSet: $inputNewTargetSet) {
      id
      setNumber
      repetitionNumber
      weight
      weightUnit
      physicalExertionUnitTime{
        hours
        minutes
        seconds
      }
      restTime{
        hours
        minutes
        seconds
      }
      targetSetUpdate {
        id
      }
      performanceLogs {
        id
        setIndex
        repetitionNumber
        weight
        weightUnit
        logDate
      }
    }
  }
`;

export const MOD_TARGET_SET = gql`
  mutation ($inputTargetSet: InputTargetSet!){
    modifyTargetSet(inputTargetSet: $inputTargetSet) {
      id
      setNumber
      repetitionNumber
      weight
      weightUnit
      physicalExertionUnitTime{
        hours
        minutes
        seconds
      }
      restTime{
        hours
        minutes
        seconds
      }
      targetSetUpdate {
        id
      }
      performanceLogs {
        id
        setIndex
        repetitionNumber
        weight
        weightUnit
        logDate
      }
    }
  }
`;

export const DEL_TARGET_SET = gql`
  mutation ($targetSetId : Int!){
    deleteTargetSet(targetSetId: $targetSetId)
  }
`;
