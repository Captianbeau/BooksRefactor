import {gql} from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
query singleUser($userId: ID!){
    user(userId: $userId){
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