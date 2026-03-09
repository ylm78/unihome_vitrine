const allowedOrigins = [
  'http://localhost:5090',
  'http://localhost:5173',
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) : [])
];

// ngrok et autres domaines dynamiques
const isNgrokOrAllowed = (origin) => {
  if (!origin) return true;
  return allowedOrigins.some(o => origin === o)
    || origin.endsWith('.ngrok-free.dev') || origin.endsWith('.ngrok.io')
    || origin.endsWith('.trycloudflare.com');
};

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: (origin, callback) => {
      if (isNgrokOrAllowed(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // en dev, accepter pour faciliter ngrok
      }
    },
    credentials: true
  }
};

