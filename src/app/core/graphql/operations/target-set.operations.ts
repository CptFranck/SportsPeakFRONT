import {gql} from "apollo-angular";

export const GET_TARGET_SET_BY_PROG_EXERCISE_ID = gql`
  query ($id : ID!){
    getTargetSetsByProgExerciseId(id: $id) {
      id
      index
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
      creationDate
      state
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

export const ADD_TARGET_SET = gql`
  mutation ($inputNewTargetSet: InputNewTargetSet!){
    addTargetSet(inputNewTargetSet: $inputNewTargetSet) {
      id
      index
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
      creationDate
      state
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
      index
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
      creationDate
      state
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

export const MOD_TARGET_SET_STATE = gql`
  mutation ($inputTargetSetState: InputTargetSetState!){
    modifyTargetSetState(inputTargetSetState: $inputTargetSetState) {
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
      creationDate
      state
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
  mutation ($targetSetId : ID!){
    deleteTargetSet(targetSetId: $targetSetId)
  }
`;
