const { Book, User } = require("../models");
const { AuthenticationError } = require("@apollo/server");
const { SignToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user_id }).select(
          "-__v -password" // Don't get password.
        );

        return userData;
      }

      throw new AuthenticationError("Must be logged in.");
    },
  },
  Mutation: {},
};

module.exports = resolvers;
