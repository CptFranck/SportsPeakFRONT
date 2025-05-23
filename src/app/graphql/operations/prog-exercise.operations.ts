import {gql} from "apollo-angular";

export const GET_PROG_EXERCISES = gql`
  query {
    getProgExercises {
      id
      name
      note
      exercise {
        id
        name
        description
        goal
        muscles {
          id
          name
        }
      }
      targetSets {
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
      creator {
        id
        username
      }
      visibility
      trustLabel
    }
  }
`;

export const GET_PROG_EXERCISE_BY_ID = gql`
  query ($id : ID!){
    getProgExerciseById(id: $id) {
      id
      name
      note
      exercise {
        id
        name
        description
        goal
      }
      targetSets {
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
      creator {
        id
        email
        firstName
        lastName
        username
      }
      visibility
      trustLabel
    }
  }
`;

export const GET_USER_PROG_EXERCISES = gql`
  query ($userId : ID!){
    getUserProgExercises(userId: $userId) {
      id
      name
      note
      exercise {
        id
        name
        description
        goal
        muscles {
          id
          name
        }
      }
      targetSets {
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
      creator {
        id
        email
        firstName
        lastName
        username
      }
      visibility
      trustLabel
    }
  }`

export const ADD_PROG_EXERCISE = gql`
  mutation ($inputNewProgExercise: InputNewProgExercise!){
    addProgExercise(inputNewProgExercise: $inputNewProgExercise) {
      id
      name
      note
      exercise {
        id
        name
        description
        goal
        muscles {
          id
          name
        }
      }
      targetSets {
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
      creator {
        id
        username
      }
      visibility
      trustLabel
    }
  }
`;

export const MOD_PROG_EXERCISE = gql`
  mutation ($inputProgExercise : InputProgExercise!){
    modifyProgExercise(inputProgExercise: $inputProgExercise) {
      id
      name
      note
      exercise {
        id
        name
        description
        goal
        muscles {
          id
          name
        }
      }
      targetSets {
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
      creator {
        id
        username
      }
      visibility
      trustLabel
    }
  }
`;

export const MOD_PROG_EXERCISE_TRUST_LABEL = gql`
  mutation ($inputProgExerciseTrustLabel : InputProgExerciseTrustLabel!){
    modifyProgExerciseTrustLabel(inputProgExerciseTrustLabel: $inputProgExerciseTrustLabel) {
      id
      name
      note
      exercise {
        id
        name
        description
        goal
        muscles {
          id
          name
        }
      }
      targetSets {
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
      creator {
        id
        email
        firstName
        lastName
        username
      }
      visibility
      trustLabel
    }
  }
`;
export const DEL_PROG_EXERCISE = gql`
  mutation ($progExerciseId : ID!){
    deleteProgExercise(progExerciseId: $progExerciseId)
  }
`;
