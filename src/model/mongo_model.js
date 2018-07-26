import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    company: String,
});

const companySchema = new mongoose.Schema({
    name: String,
    address: String
})


const User = mongoose.model('users',userSchema);
const Company = mongoose.model('companies',companySchema);

export { User, Company };
