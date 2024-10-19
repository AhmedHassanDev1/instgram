import express from "express"
import { SignUp,Login,Get_token,Get_cookies } from "../services/authService.js"
import { signUp_validator,logIn_validator } from "../validator/auth.js"
let Router= express.Router()


Router.post("/signup",signUp_validator,SignUp)
Router.post("/login",logIn_validator,Login)
Router.get("/get_token",Get_token)
Router.get("/cookies",Get_cookies)

export default Router