//when we signup what should be happen will be written here
import { compare } from "bcrypt";
import User from "../model/Usermodel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

//token creation
{
  /*
     this function create jwt using sign method which accepts 
    1. Payload ({email,password} to encode in the token)
    2. secret key: process.env.JWT_KEY
    3. options (expriein : maxage)

    */
}

//taking email userId as parameters of the createtoken
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

// logic for signup
export const signup = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }

    //create user to save in mongoose database //this will also treger pre("save") hook in schema to hash the password before saveing
    const user = await User.create({ email, password });

    // setting up jwt as a cookies
    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      //the cookie is shared across domains in cross-site requests.
      sameSites: "None",
    });
    // The user’s browser will store this cookie, automatically including it in future requests to the same domain, allowing the server to authenticate the user on each request.
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};

{
  /*
    
    When createToken is called, actual values (called arguments) 
    will be passed to it, like this: createToken(user.email, user.id).
     Here, user.email and user.id are arguments that correspond to
      the parameters email and userId, respectively.
*/
}

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).send("user not found");
    }
    const auth = await compare(password , user.password)
    if (!auth) {
      return response.status(400).send("Password is incorrect");
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSites: "None",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("internal Server Error");
  }
};
