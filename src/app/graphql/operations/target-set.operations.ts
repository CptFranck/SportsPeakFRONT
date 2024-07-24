import {gql} from "apollo-angular";

export const GET_TARGET_SET_BY_PROG_EXERCISE_ID = gql`
  query ($id : Int!){
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
      progExercise {
        id
        name
        note
        exercise {
          id
          name
        }
        trustLabel
        visibility
        creator {
          id
          username
        }
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
      progExercise {
        id
        name
        note
        exercise {
          id
          name
        }
        trustLabel
        visibility
        creator {
          id
          username
        }
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
      progExercise {
        id
        name
        note
        exercise {
          id
          name
        }
        trustLabel
        visibility
        creator {
          id
          username
        }
      }
    }
  }
`;

export const DEL_TARGET_SET = gql`
  mutation ($targetSetId : Int!){
    deleteTargetSet(targetSetId: $targetSetId)
  }
`;
