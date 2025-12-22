import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  connectionString:
    process.env.CONNECTION_STRING || 'No connection string provided',
  jwtSecret: process.env.JWT_SECRET || 'No jwt secret provided',
};

export default config;
