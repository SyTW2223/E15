import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Especifica la carpeta de destino donde se guardarán las imágenes
    cb(null, 'assets/images');
  },filename: (req, file, cb) => {
    // Genera un nombre único para la imagen (puedes utilizar otras lógicas según tus necesidades)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.originalname.replace(/\s/g, '-'); // Remover espacios en el nombre de archivo
    cb(null, filename + '-' + uniqueSuffix);
  }
});

export const upload = multer({ storage: storage,
fileFilter:(req, file, cb) =>{
  if(file.mimetype == '.png' || file.mimetype == '.jpg' || file.mimetype == '.jpeg'){
      cb(null, true);
    } else {
      cb(null,false);
      return cb(new Error('Solo acepta .png, .jpg, jpeg'));
   }
  }
});