import multer from 'multer';

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Especifica la carpeta de destino donde se guardarán las imágenes
    cb(null, DIR);
  },filename: (req, file, cb) => {
    // Genera un nombre único para la imagen (puedes utilizar otras lógicas según tus necesidades)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.replace(/\s/g, '-'); // Remover espacios en el nombre de archivo
    cb(null, uniqueSuffix + '-' + filename);
  }
});

export const upload = multer({ storage: storage,
fileFilter:(req, file, cb) =>{
  if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cb(null, true);
    } else {
      cb(null,false);
      return cb(new Error('Solo acepta .png, .jpg, jpeg'));
   }
  }
});