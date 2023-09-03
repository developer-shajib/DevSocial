import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.v2.config({
  cloud_name: 'do6dt1ot2',
  api_key: '959856998471536',
  api_secret: 'e0JwQpDr3fvZcmEfcqqm4zLhoD0'
});

export const cloudUpload = async (path) => {
  // fs.writeFileSync('./' + req.file.originalname, req.file.buffer);
  // <!-- upload photo cloudinary -->
  const data = await cloudinary.v2.uploader.upload(path);

  // fs.unlinkSync('./' + req.file.originalname);

  return data;
};
