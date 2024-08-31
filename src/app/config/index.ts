import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_rul: process.env.DATABASE_URL,
  bcrypt_Salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
};
