import mongoose, { models } from "mongoose";
import {gensalt , hash} from "bcrypt"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    required: false,
  },
});


{/*
The userSchema.pre("save") middleware is set up to run before the document is saved to MongoDB.
The goal is to hash the password before saving it to ensure it’s stored securely.
gensalt() is used to generate a salt, and hash() is used to create a hashed version of the password.
    */}
userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

//users will create in our mongodb database
const User = mongoose.models.User || mongoose.model("Users", userSchema)

export default User;