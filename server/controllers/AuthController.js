//when we signup what should be happen will be written here

import { request, response } from "express";

export const signup = async ()=>{
    try {
        const {email,password} = request.body;
        if(!email || !password) {
            return response.status(400).send("Email and Password is required")
        }
    } catch (error) {
        console.log({error});
        return response.status(500).send("internal Server Error");
    }
}