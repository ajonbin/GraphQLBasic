import mongoose from "mongoose";
import { User,Company } from "../model/mongo_model";
import assert from "chai";

before((done) => {
    //Connect to Mongo
    const MONGO_URL = "mongodb://ajonbin:ajonbin123@ds253821.mlab.com:53821/users"
    mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    var db = mongoose.connection;
    db.once('open',() => {
        User.collection.drop();
        Company.collection.drop();
        done();
    }).on('error',(e) => done(e));
});

describe("Mongo DB Test", ()=>{
    it("Insert New User", (done) =>{
        let john = new User({
            name: "John",
            email: "john@google.com",
            company: "google.com"
        });
        john.save().then(() => {
            assert.assert(!john.isNew);
            done();
        }).catch( e => done(e));
    }),
    it("Insert New Company", (done)=>{
        let g = new Company({
            name: "google",
            address: "USA"
        });
        g.save().then(() => done()).catch(e => done(e));
    })
});