import fetch from "node-fetch";
import {assert, should, expect} from "chai";
import mongoose from "mongoose";
import { User,Company } from "../model/mongo_model";

const GRAPHQL_RUL = "http://localhost:4000/graphql";

before((done) => {
    const MONGO_URL = "mongodb://ajonbin:ajonbin123@ds253821.mlab.com:53821/users"
    mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    var db = mongoose.connection;
    db.once('open',() => {
        User.deleteMany({}).then(() => {
            Company.deleteMany({}).then (()=> {
                done();
            })
        })
    }).on('error',(e) => done(e));
});

function graphqlQuery(query,done,check){
    fetch(GRAPHQL_RUL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    }).then(res => res.json())
    .then(data => {
        console.log(data);
        check(data.data);
        done();
    })
    .catch(e => done(e));
}

function graphqlMutation(query,done){
    fetch(GRAPHQL_RUL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    }).then(res => res.json())
    .then(data => {
        console.log(data);
        done();
    })
    .catch(e => done(e));
}

describe('Graphql Demo',function(){

    it("Insert User John@google", function(done){
        let query = `mutation{
            addUser(name: "John",email: "john@google.com",company: "google"){
                uid
            }
        }`;
        graphqlMutation(query,done);
    }),
    it("Insert User Mike@goole", function(done){
        let query = `mutation{
            addUser(name: "Mike",email: "mike@google.com",company: "google"){
                uid
            }
        }`
        graphqlMutation(query,done);
    }),
    it("Insert User Jay@microsoft", function(done){
        let query = `mutation{
            addUser(name: "Jay",email: "jay@microsoft.com",company: "microsoft"){
                uid
            }
        }`;
        graphqlMutation(query,done);
    }),
    it("Insert Company Google", function(done){
        let query = `mutation{
            addCompany(name: "google",address:"USA"){
                cid
            }
        }`;
        graphqlMutation(query,done);
    }),
    it("Insert Company Microsoft", function(done){
        let query = `mutation{
            addCompany(name: "microsoft",address:"USA"){
                cid
            }
        }`;
        graphqlMutation(query,done);
    }),
    it("Query Mike", function(done){
        let query = `{
            user(name: "Mike"){
                name
                company{
                    name
                }
                email
            }
        }`;
        graphqlQuery(query,done,(result) => {
            assert(result.user.company.name === 'google');
        });
    }),
    it("Query Jay", function(done){
        let query = `{
            user(name: "Jay"){
                name
                company{
                    name
                    address
                }
                email
            }
        }`;
        graphqlQuery(query,done,(result) => {
            assert(result.user.company.name === 'microsoft');
            assert(result.user.company.address === 'USA');
        });
    }),
    it("Query Users of Google", function(done){
        let query = `{
            company(name: "google"){
                users{
                    name
                }
            }
        }`;
        graphqlQuery(query,done,(result) => {
            assert(result.company.users.length == 2);
        });
    }),
    it("Update Mike", function(done){
        let query = `mutation{
            updateUser(name: "Mike",email: "mike@microsoft.com",company: "microsoft"){
                company{
                    name
                }
            }
        }`;
        graphqlMutation(query,done);
    }),
    it("Query Mike", function(done){
        let query = `{
            user(name: "Mike"){
                name
                company{
                    name
                }
                email
            }
        }`;
        graphqlQuery(query,done,(result) => {
            assert.equal(result.user.company.name, 'microsoft');
        });
    })
});

