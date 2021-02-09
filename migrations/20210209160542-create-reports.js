'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db, callback) {
    db.createTable(
        'reports',
        {
            columns: {
                id: { type: 'int', primaryKey: true, autoIncrement: true },
                external_ref: { type: 'string', notNull: true, unique: true },
                status: { type: 'string', notNull: true },
                data: { type: 'jsonb', notNull: true }
            },
            ifNotExists: true
        },
        (e) => {
            if (e) {
                callback(e);
            } else {
                db.addIndex(
                    'reports',
                    'reports_external_ref',
                    ['external_ref'],
                    true,
                    (e) => {
                        if (e) {
                            callback(e);
                        } else {
                            db.addIndex(
                                'reports',
                                'reports_status',
                                ['status'],
                                callback
                            );
                        }
                    }
                );
            }
        }
    );
};

exports.down = function (db, callback) {
    db.dropTable('reports', callback);
};

exports._meta = {
    version: 1
};
