//all the library function will be inside this 

import axios from "axios"

import { HOST } from "@/utils/constants.js"

 const apiClient = axios.create({
    baseUrl: HOST ,
})

export default apiClient;
// we will use this apiclient api to signup in fronetend