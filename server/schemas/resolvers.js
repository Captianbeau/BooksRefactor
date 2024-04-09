const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const resolvers = {
    Query: {
        //get single user
        user: async (parent, { userId}) => {
            console.log('we call')
            const user = User.findOne({ _id: userId }).populate('savedBooks');
             if(!user){
                console.log('no user');
             }
             return user;
        }
    },
    Mutation: {
        //create user and login
        createUser: async (parent, { username, email, password }) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            
            return { token, user };

        },
        //save a book through user
        saveBook: async (parent, { userId, book }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );
        },
        //delete a book through user
        deleteBook: async (parent, { userId, book }) => {
           return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: book } } },
                { new: true }
            );
        },

        // login with a token
        login: async (parent, {username, email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;