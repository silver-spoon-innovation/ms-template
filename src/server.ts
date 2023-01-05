import express from 'express';
import mongoose from 'mongoose';
import Routes from '@src/route';

async function main() {
    const PORT = process.env.PORT || 5501;

    const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE} = process.env

    const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`;
    mongoose.connect(connectionString, (err: unknown) => {
        if(err) {
            console.log(err);
            console.log('Unable to connect to MongoDB, exiting...');
            process.exit(1);
        }
        console.log('Connected to MongoDB');
    });

    const app = express();

    app.use(express.json());

    app.use('/api', Routes);

    app.listen(PORT, () => {
        console.log('service runnning on port', PORT);
    });
}

main();