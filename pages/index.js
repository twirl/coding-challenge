import Head from 'next/head';
import { Component } from 'react';
import styles from '../styles/Index.module.css';
import { list } from '../lib/reports';
import Report from '../components/report';
import { index as l10n } from '../l10n/en';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env['DATABASE_URL']
});

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data };
    }

    beforeUpdate(promise) {
        this.updatePromise = promise;
        promise.then((data) => {
            if (this.updatePromise == promise) {
                console.log('updating');
                this.setState({
                    data
                });
            } else {
                console.log('no match');
            }
        });
    }

    render() {
        return (
            <section className={styles.index}>
                <Head>
                    <title>Coding Challenge</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h2>{l10n.reports()}</h2>
                {this.state.data.elements.map((el) => (
                    <Report
                        data={el}
                        l10n={l10n}
                        key={el.id}
                        onBeforeUpdate={(promise) => {
                            this.beforeUpdate(promise);
                        }}
                    />
                ))}
            </section>
        );
    }
}

export async function getServerSideProps() {
    const client = await pool.connect();
    const data = await list(client);
    client.release();
    return { props: { data } };
}
