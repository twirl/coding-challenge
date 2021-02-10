import fs from 'fs';
import path from 'path';

const GET_REPORT_LIST_SQL = fs.readFileSync(
    path.resolve(process.cwd(), 'sql', 'get-report-list.sql'),
    'utf-8'
);
const REPORT_RESOLVE_SQL = fs.readFileSync(
    path.resolve(process.cwd(), 'sql', 'report-resolve.sql'),
    'utf-8'
);

export async function list(client) {
    const results = await client.query(GET_REPORT_LIST_SQL);
    return {
        elements: results.rows.map((row) =>
            Object.assign(
                {},
                {
                    blocked: row.blocked
                },
                row.data
            )
        )
    };
}

export async function resolve(client, resolution, id) {
    await client.query(REPORT_RESOLVE_SQL, [resolution, id]);
    return {};
}
