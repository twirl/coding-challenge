import { list } from '../lib/reports';

export default async (req, res, next) => {
    try {
        const results = await list(req.client);
        res.json(results);
    } catch (e) {
        next(e);
    }
};
