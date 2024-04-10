import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation createUser(
  $username:String!, 
  $email: String!, 
  $password: String!
){
    createUser(
      username: $username, 
      email: $email, 
      password: $password
    ){
        token
        user {
          _id
        }
    }
}
`;
export const ADD_BOOK = gql`
mutation saveBook($userId: String!, $book: [Book]! ){
    saveBook(userId: $userId, book: $book ){
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
export const DELETE_BOOK = gql`
mutation deleteBook($userId: String!, $book:String!){
    deleteBook(userId: $userId, book: $book){
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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;