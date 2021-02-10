import { list } from '../lib/reports';
import { block } from '../lib/sources';

export default async (req, res, next) => {
    try {
        await block(req.client, req.body.blocked === true, req.params.id);
        const results = await list(req.client);
        res.json(results);
    } catch (e) {
        next(e);
    }
};
