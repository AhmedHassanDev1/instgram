import { config } from "dotenv";

export let {
    PORT,
    JWT_SECRET,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
}=config({path:'./.env'}).parsed 