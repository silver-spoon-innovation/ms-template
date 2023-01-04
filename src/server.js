import express from 'express';

async function main() {
    const app = express();
    app.use(express.json());
    app.listen(5051, () => {
        console.log('service runnning on port 5051');
    });
}

main();