import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(config.database_rul as string);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
