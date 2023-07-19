/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  await mongoose.connect(config.database_url as string, {
    autoIndex: true,
  });
  console.log('Connected to MongoDB');
  app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}`);
  });
}
main();
