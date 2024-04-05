import{gql} from '@apollo/client';

export const ADD_USER = gql `
mutation createUser($username:String, $email: String!, $password: String!){
    createUser(username: $username, email: $email, password: $password){
        _id
        username
        email
        password
        savedBooks
    }
}
`;