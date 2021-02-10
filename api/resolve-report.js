import { list, resolve } from '../lib/reports';

export default async (req, res, next) => {
    try {
        await resolve(req.client, req.body.ticketState, req.params.id);
        const results = await list(req.client);
        res.json(results);
    } catch (e) {
        next(e);
    }
};
