const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const resolvers = {
    Query: {
        //get single user
        singleUser: async (parent, { userId, username }) => {
            return User.findOne({
                $or: [{ _id: userId }, { username: username }],
            }).populate('savedBooks');
        }
    },
    Mutation: {
        //create user and login
        createUser: async (parent, { username, email, password }) => {
            console.log(user);
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
        deleteBook: async (parent, { userId, params }) => {
            User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
        },

        // login with a token
        login: async (parent, {username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
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