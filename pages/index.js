import Head from 'next/head';
import styles from '../styles/Index.module.css';
import { list } from '../lib/reports';
import Report from '../components/report';
import { index as l10n } from '../l10n/en';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env['DATABASE_URL']
});

export default function Home({ data }) {
    return (
        <section className={styles.index}>
            <Head>
                <title>Coding Challenge</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>{l10n.reports()}</h2>
            {data.elements.map((el) => (
                <Report data={el} l10n={l10n} key={el.id} />
            ))}
        </section>
    );
}

export async function getServerSideProps() {
    const client = await pool.connect();
    const data = await list(client);
    return { props: { data } };
}
