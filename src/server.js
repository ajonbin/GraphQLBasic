import express from "express";
import mongoose from "mongoose";
import expressGraphQL from "express-graphql";
import { schema } from "./schema/schema";

const server = express();

//Connect to Mongo
const MONGO_URL = "mongodb://ajonbin:ajonbin123@ds253821.mlab.com:53821/users"
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open',() => "Mongo BD connected",)
    .on('error',console.error.bind(console, 'connection error:'));


//Reister GraphQL with Express
server.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

//Start Listening
server.listen(4000,function(){
    console.log("Server Listening...");
});

