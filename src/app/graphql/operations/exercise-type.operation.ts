import {gql} from "apollo-angular";

export const GET_EXERCISE_TYPES = gql`
  query {
    getExerciseTypes {
      id
      name
      goal
      exercises {
        id
        name
        goal
        description
      }
    }
  }
`;

export const ADD_EXERCISE_TYPES = gql`
  mutation ($inputNewExerciseType : InputNewExerciseType!){
    addExerciseType(inputNewExerciseType: $inputNewExerciseType) {
      id
      name
      goal
      exercises {
        id
        name
        goal
        description
      }
    }
  }
`;

export const MOD_EXERCISE_TYPES = gql`
  mutation ($inputExerciseType : InputExerciseType!){
    modifyExerciseType(inputExerciseType: $inputExerciseType) {
      id
      name
      goal
      exercises {
        id
        name
        goal
        description
      }
    }
  }
`;

export const DEL_EXERCISE_TYPES = gql`
  mutation ($exerciseTypeId : ID!){
    deleteExerciseType(exerciseTypeId: $exerciseTypeId)
  }
`;

