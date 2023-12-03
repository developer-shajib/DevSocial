// allowed origin
const allowedOrigins = ['https://my-dev-social.vercel.app', 'http://localhost:3000', 'http://localhost:5173', 'https://dev-social-five.vercel.app'];

// cors options
const corsOptions = {
  origin: true,
  // (origin, callback) => {
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not Allowed by CORS'));
  //   }
  // },
  credentials: true,
  optionsSuccessStatus: 200
};

// exports
export default corsOptions;
