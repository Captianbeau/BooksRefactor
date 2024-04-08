import {gql} from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
query singleUser($userId: ID!, $username: String!){
    user(userId: $userId, username:$username){
        _id
        username
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