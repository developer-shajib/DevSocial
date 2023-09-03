import multer from 'multer';

// <!-- create storage -->
// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.floor(Math.random() * 100000) + '_' + file.fieldname);
  }
});

// export const userPhoto = multer({ storage }).single('photo');

export const multerMiddleware = multer({ storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
  { name: 'posts', maxCount: 1 }
]);
