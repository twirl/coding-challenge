import fs from 'fs';
import { list } from '../lib/reports';

export default async (req, res) => {
    const results = await list(req.client);

    res.json(results);
};
