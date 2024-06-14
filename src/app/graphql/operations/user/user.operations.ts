import {gql} from "apollo-angular";

export const GET_USERS = gql`
  query {
    getUsers {
      id
      email
      firstName
      lastName
      username
      token
    }
  }
`;

export const MOD_USER = gql`
  mutation ($inputUser : InputUser!){
    modifyUser(inputUser: $inputUser) {
      id
      email
      firstName
      lastName
      username
      token
    }
  }
`;

export const DEL_USER = gql`
  mutation ($userId : Int!){
    deleteUser(userId: $userId)
  }
`;
