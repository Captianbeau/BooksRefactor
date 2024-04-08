const typeDefs = `
type Users {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Books]
}

type Books {
    _id: ID!
    authors: [String]
    description: String
    bookId: String
    link: String
    title:String
}

type Auth {
    token: ID
    user: Users
}

input Book {
    _id:ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

input User{
    _id: ID!
    username:String!
    email: String!
    password: String!
    savedBooks: Book
}
type Query{
user(userId:ID!): Users
}

type Mutation{
createUser(username:String!, email:String!, password: String!): Auth
saveBook(userId: ID! , book: [Book]!): Users
deleteBook(userId: ID!, book: Book): Users
login(username: String, email: String!, password: String!): Auth
}
`

module.exports = typeDefs;