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
export const ADD_BOOK = gql`
mutation saveBook($userId: ID!, $book: [ID]!){
    saveBook(userId: $userId, book: $book){
        _id
        savedBooks{
            _id
            authors
            description
            bookId
            link
            title
        }
    }
}
`;
export const REMOVE_BOOK = gql`
mutation removeBook($userId: ID!, $book: ID!){
    removeBook(userId: $userId, book: $book){
        _id
        savedBooks{
            _id
            authors
            description
            bookId
            link
            title
        }
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