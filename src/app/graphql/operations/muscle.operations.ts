import {gql} from "apollo-angular";

export const GET_MUSCLES = gql`
  query {
    getMuscles {
      id
      name
      description
      function
      exercises {
        id
        name
        goal
        description
      }
    }
  }
`;

export const ADD_MUSCLE = gql`
  mutation ($inputNewMuscle : InputNewMuscle!){
    addMuscle(inputNewMuscle: $inputNewMuscle) {
      id
      name
      description
      function
      exercises {
        id
        name
        goal
        description
      }
    }
  }
`;

export const MOD_MUSCLE = gql`
  mutation ($inputMuscle : InputMuscle!){
    modifyMuscle(inputMuscle: $inputMuscle) {
      id
      name
      function
      description
      exercises {
        id
        name
        goal
        description
      }
    }
  }
`;

export const DEL_MUSCLE = gql`
  mutation ($muscleId : Int!){
    deleteMuscle(muscleId: $muscleId)
  }
`;


