import express from 'express';

async function main() {
    const app = express();
    app.use(express.json());
    app.listen(5501, () => {
        console.log('service runnning on port', 5501);
    });
}

main();