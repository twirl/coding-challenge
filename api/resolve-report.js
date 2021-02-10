import { list, resolve } from '../lib/reports';

export default async (req, res) => {
    const parameters = JSON.parse(req.body);
    await resolve(req.client, req.params.id, parameters.ticketState);
    const results = await list(req.client);

    res.json(results);
};
