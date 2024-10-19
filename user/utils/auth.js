import {DB} from "../exports.js"
import { compare } from "bcrypt"

let emailNotExist=async(email)=>{
    let user=await DB.user.findUnique({where:{email}})
    if (user) {
       throw new Error('E-mail already in use')
    }
 } 

let emailIsExist=async(email)=>{
    let user=await DB.user.findUnique({where:{email}})
    if (!user) {
       throw new Error('E-mail not exist')
    }
} 

let invalidPassword=async(password,{req})=>{
  let {email}=req.body 
  let {password:hashing}=await DB.user.findUnique({where:{email},select:{password:true}})
  let validPassword=await compare(password,hashing)
  if (!validPassword) {
    throw new Error('password is invalid')
  }
}
export {emailNotExist,emailIsExist,invalidPassword} 