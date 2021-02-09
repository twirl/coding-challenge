import Head from 'next/head';
import styles from '../styles/Index.module.css';
import { sample } from './sample';
import Report from '../components/report';
import { index as l10n } from '../l10n/en';

export default function Home() {
    return (
        <section className={styles.index}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>{l10n.reports()}</h2>
            {sample.elements.map((el) => (
                <Report data={el} l10n={l10n} key={el.id} />
            ))}
        </section>
    );
}
