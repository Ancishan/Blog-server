import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join((process.cwd(), '.env'))});

export default {
    NODE_ENV: process.env.NODE_ENV,
    port : process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_secret:process.env.JWT_SECRET ,
    jwt_expires:process.env.JWT_EXPIRES,
    jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES
};