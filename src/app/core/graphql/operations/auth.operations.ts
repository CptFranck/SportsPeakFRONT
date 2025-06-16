import {gql} from "apollo-angular";

export const LOGIN = gql`
  mutation ($inputCredentials: InputCredentials!){
    login(inputCredentials: $inputCredentials){
      tokenType
      accessToken
      user {
        id
        email
        firstName
        lastName
        username
        roles {
          id
          name
          privileges {
            id
            name
          }
        }
      }
    }
  }`;

export const REGISTER = gql`
  mutation ($registerInput : RegisterInput!) {
    register(registerInput: $registerInput){
      tokenType
      accessToken
      user {
        id
        email
        firstName
        lastName
        username
        roles {
          id
          name
          privileges {
            id
            name
          }
        }
      }
    }
  }`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken{
    refreshToken{
      tokenType
      accessToken
      user{
        id
        email
        firstName
        lastName
        username
        roles {
          id
          name
          privileges {
            id
            name
          }
        }
      }
    }
  }`;

export const LOGOUT = gql`
  mutation logout{
    logout
  }`;
