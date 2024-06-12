import {gql} from "apollo-angular";

export const GET_EXERCISES = gql`
  query GetExercises {
    getExercises {
      id
      name
      description
      goal
      muscles {
        id
        name
        description
        function
      }
      exerciseTypes {
        id
        name
        goal
      }
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation ($inputNewExercise : InputNewExercise!){
    addExercise(inputNewExercise: $inputNewExercise) {
      id
      name
      goal
      description
      muscles {
        id
        name
        function
      }
      exerciseTypes {
        id
        name
        goal
      }

    }
  }
`;

export const MOD_EXERCISE = gql`
  mutation ($inputExercise : InputExercise!){
    modifyExercise(inputExercise: $inputExercise) {
      id
      name
      goal
      description
      muscles {
        id
        name
        function
      }
      exerciseTypes {
        id
        name
        goal
      }
    }
  }
`;

export const DEL_EXERCISE = gql`
  mutation ($exerciseId : Int!){
    deleteExercise(exerciseId: $exerciseId)
  }
`;
