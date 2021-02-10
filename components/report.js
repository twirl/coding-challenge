import { Component } from 'react';
import styles from '../styles/Report.module.css';

export default class Report extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data, l10n } = this.props;
        const { payload } = data;
        return (
            <section className={styles.report} key={data.id}>
                <div className={styles.view} key="view">
                    {Object.entries({
                        id: data.id,
                        type: payload.reportType,
                        state: data.state,
                        message: payload.message,
                        details: data.details
                    }).map(([type, value]) => (
                        <span
                            className={styles.item}
                            key={type}
                            dangerouslySetInnerHTML={{
                                __html: l10n.items[type](value)
                            }}
                        />
                    ))}
                </div>
                <div className={styles.actions} key="actions">
                    {data.blocked ? (
                        <button
                            className={styles.button}
                            key="blocked"
                            disabled="disabled"
                        >
                            {l10n.blocked()}
                        </button>
                    ) : (
                        <button className={styles.button} key="block">
                            {l10n.actions.block()}
                        </button>
                    )}
                    <button className={styles.button} key="resolve">
                        {l10n.actions.resolve()}
                    </button>
                </div>
            </section>
        );
    }
}
