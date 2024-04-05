const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
}

type Books {
    _id: ID
    authors: String
    description: String
    bookId: String
    link: String
    title:String
}

input Book {
    authors: String!
    description: String!
    bookId: String!
    link: String!
    title: String!
}

type Query{

}

type Mutation{

}
`

module.exports = typeDefs;