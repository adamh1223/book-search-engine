const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    searchBooks: async (_, { query }) => {
      // Mocked data for search functionality
      return [
        {
          bookId: "1",
          authors: ["Author One"],
          description: "Description of Book One",
          title: "Book One",
          image: "http://example.com/image1.jpg",
          link: "http://example.com/book1",
        },
      ];
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email");
      }
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
