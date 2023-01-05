import express from 'express';
// import mongoose from 'mongoose';
// import Routes from '@src/route';

async function main() {
    const PORT = process.env.PORT || 5501;

    // const connectionString = `mongodb://mongo:27017/microservice-db`;
    // mongoose.connect(connectionString, (err: unknown) => {
    //     if(err) {
    //         console.log(err);
    //         console.log('Unable to connect to MongoDB, exiting...');
    //         process.exit(1);
    //     }
    //     console.log('Connected to MongoDB');
    // });

    const app = express();

    app.use(express.json());

    app.get('/api', (req: express.Request, res: express.Response): void => {
        res.status(200).json({msg: 'Hello'});
    })

    // app.use('/api', Routes)

    app.listen(PORT, () => {
        console.log('service runnning on port', PORT);
    });
}

main();