import { Pool } from 'pg';
import express from 'express';
import getReportList from '../../api/get-report-list';

const pool = new Pool({
    connectionString: process.env['DATABASE_URL']
});
const app = express()
    .use(async (req, res, next) => {
        req.client = await pool.connect();
        res.header('Content-Type', 'application/json');
        next();
    })
    .get('/api/v1', getReportList)
    .use((req, res) => {
        res.status(404);
        res.json({
            type: 'not_found',
            message: 'The requested endpoint not found'
        });
    })
    .use((e, req, res, next) => {
        res.status(500);
        res.json({
            type: 'internal_server_error',
            message: 'Internal server error'
        });
    });

export default app;
