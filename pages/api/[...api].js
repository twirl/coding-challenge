import { Pool } from 'pg';
import express from 'express';
import getReportList from '../../api/get-report-list';
import blockSource from '../../api/block-source';
import resolveReport from '../../api/resolve-report';

const pool = new Pool({
    connectionString: process.env['DATABASE_URL']
});
const app = express()
    .use(async (req, res, next) => {
        req.client = await pool.connect();
        res.header('Content-Type', 'application/json');
        res.on('finish', () => {
            req.client.release();
        });
        next();
    })
    .get('/api/v1', getReportList)
    .put('/api/v1/sources/:id/block', blockSource)
    .put('/api/v1/reports/:id', resolveReport)
    .use((req, res) => {
        res.status(404);
        res.json({
            type: 'not_found',
            message: 'The requested endpoint not found'
        });
    })
    .use((e, req, res, next) => {
        console.error('API error', e);
        res.status(500);
        res.json({
            type: 'internal_server_error',
            message: 'Internal server error'
        });
    });

export default app;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb'
        }
    }
};
