import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import Routes from '@src/route';
import metricsMiddleware from '@src/metrics';
import HealthRoutes from '@src/route/healthcheck';

async function main() {
    const swaggerDocument = YAML.load('./api-docs.yml');

    const PORT = process.env.PORT || 5501;

    const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE} = process.env

    let connectionString = ""

    if(process.env.NODE_ENV === "dev"){
        connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`;
    } else {
        connectionString = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
    }  

    mongoose.connect(connectionString, (err: unknown) => {
        if(err) {
            console.log(err);
            console.log('Unable to connect to MongoDB, exiting...');
            process.exit(1);
        }
        console.log('connected to mongodb');
    });

    const app = express();

    app.use(express.json());

    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));
    app.get('/api-docs.json', (req: any, res: any) => res.json(swaggerDocument));

    app.use(HealthRoutes);

    app.use(metricsMiddleware);

    app.use('/api', Routes);

    app.listen(PORT, () => {
        console.log('service runnning on port', PORT);
    });
}

main();