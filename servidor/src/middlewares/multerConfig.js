import multer from 'multer';

let stlExtension= ".stl";

const storageTemporalStl = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'src/uploads/tempStl');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const storageStlAndImg = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') || file.originalname.endsWith('.png')) {
      cb(null, 'src/uploads/img'); // Carpeta de destino para las imágenes
    } else if (file.originalname.endsWith(stlExtension.toLowerCase())) {
      cb(null, 'src/uploads/stl'); // Carpeta de destino para los archivos STL
    } else {
      cb(new Error('Tipo de archivo no válido'));
    }
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '-' + file.originalname.replace(/\s+/g, '_'))
  }
});


export const upload = multer({
  dest: 'uploads/',// Directorio donde se guardarán las imágenes
})
export const uploadTemporalStl = multer({ storage: storageTemporalStl });
export const uploadStlAndImg = multer({ storage: storageStlAndImg });
