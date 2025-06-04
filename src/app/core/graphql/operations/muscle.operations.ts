import {gql} from "apollo-angular";

export const GET_MUSCLES = gql`
  query {
    getMuscles {
      id
      name
      latinName
      description
      function
      illustrationPath
      exercises {
        id
        name
      }
    }
  }
`;

export const GET_MUSCLE_BY_ID = gql`
  query ($id : ID!) {
    getMuscleById (id : $id) {
      id
      name
      latinName
      function
      description
      illustrationPath
      exercises {
        id
        name
        description
        goal
      }
    }
  }
`;


export const ADD_MUSCLE = gql`
  mutation ($inputNewMuscle : InputNewMuscle!){
    addMuscle(inputNewMuscle: $inputNewMuscle) {
      id
      name
      latinName
      description
      function
      illustrationPath
      exercises {
        id
        name
      }
    }
  }
`;

export const MOD_MUSCLE = gql`
  mutation ($inputMuscle : InputMuscle!){
    modifyMuscle(inputMuscle: $inputMuscle) {
      id
      name
      latinName
      function
      description
      illustrationPath
      exercises {
        id
        name
      }
    }
  }
`;

export const DEL_MUSCLE = gql`
  mutation ($muscleId : ID!){
    deleteMuscle(muscleId: $muscleId)
  }
`;

export const FRAG_MUSCLE_ILLUSTRATION = gql`fragment MuscleIllustration on Muscle {
  illustrationPath
}`;


