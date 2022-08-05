
const { User } = require('../models');
// const bookSchema = require('../models/Book');
const { AuthenticationError } = require('apollo-server-express');
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData =await User.findOne ({ _id: context.user._id })
                .select("-_v -password")
                return userData;
            }
            
            throw new AuthenticationError('Please log in')
        },
        
    },
    Mutation: {
        addUser: async (parent, args) => {
            
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user };
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });
    
            if(!user) {
                throw new AuthenticationError('Invalid Credentials')
            }
            const correctPW = await user.isCorrectPassword(password);
    
            if(!correctPW) {
                throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user);
            return {token,user}; 
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
        
        // const savedBook = await bookSchema.create({ ...args, username:context.user.username });
    
        const updatedUser = await User.finByIdAndUpdate(
            {_id:context.user._id },
            { $addToSet: { savedBooks: args.input }},
            { new:true }
        );
        return updatedUser;
    }
    throw new AuthenticationError('Please log in');
    },
    
    removeBook: async (parent,{ bookId }, context) => {
        if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId:bookId }}},
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError('Please log in');
    }
    }
}



 module.exports = resolvers;