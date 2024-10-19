import express from "express"
import multer from "multer"

import Storage from "../utils/storge.js"
import { Uploadpost , UploadUserImage } from "../services/upload.js"
let Router = express()

let Upload=multer({storage:Storage })

Router.post('/',Upload.array('files',10),Uploadpost)


export default Router