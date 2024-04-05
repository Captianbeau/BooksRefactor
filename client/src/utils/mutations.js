import{gql} from '@apollo/client';

export const ADD_USER = gql `
mutation createUser($username:String, $email: String!, $password: String!){
    createUser(username: $username, email: $email, password: $password){
        token
        user {
          _id
        }
}
`;
export const LOGIN = gql`
  mutation login($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;