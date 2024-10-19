import express from "express"
import multer from "multer"

import Storage from "../utils/storge.js"
import {  UploadUserImage } from "../services/upload.js"
let Router = express()

let Upload=multer({storage:Storage})

Router.post('/',Upload.single('file'),UploadUserImage)

export default Router
