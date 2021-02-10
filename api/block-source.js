import { list } from '../lib/reports';
import { block } from '../lib/sources';

export default async (req, res) => {
    const parameters = JSON.parse(req.body);
    await block(req.client, parameters.blocked === true, req.params.id);
    const results = await list(req.client);

    res.json(results);
};
