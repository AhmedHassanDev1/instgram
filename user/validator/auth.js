import { body,validationResult } from "express-validator"
import { emailNotExist ,emailIsExist,invalidPassword} from "../utils/auth.js";



let  ValidationError=(req,res,next)=>{
    const errors = validationResult(req);
  
    if (errors.errors.length) {
        return res.status(400).json({message:errors.array()[0].msg}) 
    } 
    next()
}

let signUp_validator=[
   body('name').trim().notEmpty().withMessage('name is required'),
   body("email").trim().notEmpty().withMessage('email is required')
   .isEmail().withMessage('email is invalid')
   .custom(emailNotExist).withMessage('E-mail already in use'),
   body("password").isLength({min:8}),
   ValidationError
] 

let logIn_validator=[
  body("email").custom(emailIsExist).withMessage('email is not exist'),
  body("password").custom(invalidPassword).withMessage('password is invalid'),
  ValidationError
] 
export {signUp_validator,logIn_validator}