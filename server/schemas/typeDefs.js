const typeDefs = `
type Users {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: Books
}

type Books {
    _id: ID
    authors: String
    description: String
    bookId: String
    link: String
    title:String
}

type Auth {
    token: ID!
    user: User
}

input Book {
    _id:ID!
    authors: String!
    description: String!
    bookId: String!
    link: String!
    title: String!
}

input User{
    _id: ID!
    username:String!
    email: String
    password: String
    savedBooks: Books
}
type Query{
singleUser(userId:ID!, username: String!): User
}

type Mutation{
createUser(username:String!, email:String!, password: String!): Auth
saveBook(userId: ID! , book: Book): User
removeBook(userId: ID!, book: Book): User
login(username: String!, email: String!, password: String!): Auth
}
`

module.exports = typeDefs;