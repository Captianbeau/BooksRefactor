const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const resolvers = {
    Query: {
        //get single user
        getSingleUser: async (parent, { user }) => {
            let user = null, params;
            return User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
            });
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
        saveBook: async (parent, { user, book }) => {
            return User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );
        },
        //delete a book through user
        deleteBook: async (parent, { user, params }) => {
            User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
        },

        // login with a token
        login: async (parent, { body }) => {
            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);
            return { token, user };
        }
    }
};

module.exports = resolvers;