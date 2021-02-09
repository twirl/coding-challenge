import fs from 'fs';
import path from 'path';

const GET_REPORT_LIST_SQL = fs.readFileSync(
    path.resolve(process.cwd(), 'sql', 'get-report-list.sql'),
    'utf-8'
);

export default async (req, res) => {
    const results = await req.client.query(GET_REPORT_LIST_SQL);

    res.json({
        elements: results.rows.map((row) => row.data)
    });
};
