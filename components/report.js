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
                    {['block', 'resolve'].map((action) => (
                        <button className={styles.button} key={action}>
                            {l10n.actions[action]()}
                        </button>
                    ))}
                </div>
            </section>
        );
    }
}
