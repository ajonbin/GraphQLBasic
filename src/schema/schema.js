import * as graphql from "graphql";
import mongoose from "mongoose";
import { User, Company } from "../model/mongo_model";

//Destructing graphql
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const typeCompany = new GraphQLObjectType({
    name: 'Company',
    /* !!
    * User arrow function to reslove Circular Reference between typeCompany and typeUser
    */
    fields: () => ({
        cid: { 
            type: GraphQLString,
            resolve(parent,args){
                //map _id to cid
                return parent._id;
            }
        },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        users: {
            type: new GraphQLList(typeUser),
            resolve(parent,args){
                return User.find({company:parent.name}).then(result => {
                    return result.map((record => record.toObject()));
                });
            }
        }
    })
})

const typeUser = new GraphQLObjectType({
    name: 'User',
    /* !!
    * User arrow function to reslove Circular Reference between typeCompany and typeUser
    */
    fields: () => ({
        uid: { 
            type: GraphQLString,
            resolve(parent,args){
                //map _id to uid
                return parent._id;
            }
        },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        company: { 
            type: typeCompany,
            resolve(parent,args){
                return Company.findOne({name:parent.company}).then(result => result.toObject());
            }
        }
    })
});


const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: typeUser,
            args: {name: { type: GraphQLString }},
            resolve(parent, args){
                return User.findOne({name:args.name}).then((result) => {
                    return result.toObject();
                });
            }
        },
        company: {
            type: typeCompany,
            args: { name: { type: GraphQLString } },
            resolve(parent,args){
                return Company.findOne({name:args.name}).then(result => result.toObject());
            }
        }
    }
});

const rootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields:{
        addUser: {
            type: typeUser,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                company: { type: GraphQLString }
            },
            resolve(parent, args){
                let user = new User(args);
                return user.save().then(result => result.toObject());
            }
        },
        addCompany: {
            type: typeCompany,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: {type: GraphQLString},
            },
            resolve(parent, args){
                let company = new Company(args);
                return company.save().then(result => result.toObject());
            }
        },
        updateUser: {
            type: typeUser,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLString },
                company: { type: GraphQLString }
            }, 
            resolve(parent, {name,email,company}){
                return User.findOneAndUpdate({name},{email,company})
                            .then(result => result.toObject())
                            .catch(e=>console.log(e));
            }
        },
        deleteUser: {
            type: typeUser,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            }, 
            resolve(parent, {name}){
                User.deleteOne({name}).then();
            }
        },
    }
});

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});

export { schema }