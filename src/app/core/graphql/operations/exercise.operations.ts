import {gql} from "apollo-angular";

export const GET_EXERCISES = gql`
  query {
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

export const GET_EXERCISE_BY_ID = gql`
  query ($id : ID!){
    getExerciseById(id: $id) {
      id
      exerciseTypes {
        id
        name
        goal
      }
      muscles {
        id
        name
        function
      }
      progExercises {
        id
        name
        note
        trustLabel
        visibility
      }
      name
      description
      goal
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
  mutation ($exerciseId : ID!){
    deleteExercise(exerciseId: $exerciseId)
  }
`;
