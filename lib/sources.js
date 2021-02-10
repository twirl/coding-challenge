import fs from 'fs';
import path from 'path';

const SOURCE_BLOCK_SQL = fs.readFileSync(
    path.resolve(process.cwd(), 'sql', 'source-block.sql'),
    'utf-8'
);

export async function block(client, blocked, id) {
    await client.query(SOURCE_BLOCK_SQL, [blocked, id]);
    return {};
}
