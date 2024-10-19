import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'C:/Users/Gaming/Desktop/Applactions On web Dev/projects/Instagram/Services/upload/temp');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
 
export default storage  