import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', async(req, res, next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = 'error';
        res.status(503).send();
    }
})

router.get('/ping', async(req, res, next) => {
    const mongoReadyState = mongoose.connection.readyState;
    const pingcheck = {
        uptime: process.uptime(),
        message: 'ready',
        timestamp: Date.now()
    }
    if (mongoReadyState === 1) {
        return res.send(pingcheck)
    }
    pingcheck.message = 'not ready'
    return res.status(503).send();
})

export default router;