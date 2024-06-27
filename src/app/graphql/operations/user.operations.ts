import {gql} from "apollo-angular";

export const GET_USERS = gql`
  query {
    getUsers {
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
`;

export const MOD_USER_IDENTITY = gql`
  mutation ($inputUserIdentity : InputUserIdentity!){
    modifyUserIdentity(inputUserIdentity: $inputUserIdentity) {
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
  }`;

export const MOD_USER_ROLES = gql`
  mutation ($inputUserRoles : InputUserRoles!){
    modifyUserRoles(inputUserRoles: $inputUserRoles) {
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
  }`;

export const MOD_USER_EMAIL = gql`
  mutation ($inputUserEmail : InputUserEmail!){
    modifyUserEmail(inputUserEmail: $inputUserEmail) {
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

export const MOD_USER_USERNAME = gql`
  mutation ($inputUserUsername : InputUserUsername!){
    modifyUserUsername(inputUserUsername: $inputUserUsername) {
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
  }`;

export const MOD_USER_PASSWORD = gql`
  mutation ($inputUserPassword : InputUserPassword!){
    modifyUserPassword(inputUserPassword: $inputUserPassword) {
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
  }`;

export const DEL_USER = gql`
  mutation ($userId : Int!){
    deleteUser(userId: $userId)
  }
`;
