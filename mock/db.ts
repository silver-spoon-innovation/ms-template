/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;
/**
 * Connect to mock memory db.
 */
export const connectDatabase = async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
};

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  const keys: string[] = Object.keys(collections);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const collection = collections[key];
    if (collection) {
      // eslint-disable-next-line no-await-in-loop
      await collection.deleteMany({});
    }
  }
};