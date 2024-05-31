import {gql} from "apollo-angular";

export const GET_MUSCLES = gql`
  query getMus {
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

export const ADD_MUSCLES = gql`
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

export const MOD_MUSCLES = gql`
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

export const DEL_MUSCLES = gql`
  mutation ($muscleId : ID!){
    deleteMuscle(muscleId: $muscleId)
  }
`;


