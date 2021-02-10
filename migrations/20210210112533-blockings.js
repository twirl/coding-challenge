'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = async function (db) {
    await db.createTable('sources', {
        columns: {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            external_ref: { type: 'string', notNull: true, unique: true },
            blocked: { type: 'boolean', notNull: true }
        },
        ifNotExists: true
    });
    await db.addIndex(
        'sources',
        'sources_external_ref',
        ['external_ref'],
        true
    );
    await db.addIndex('sources', 'sources_blocked', ['blocked']);
    await db.addColumn('reports', 'source_id', {
        type: 'int'
    });
    await db.addForeignKey(
        'reports',
        'sources',
        'reports_source_id_ref',
        { source_id: 'id' },
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    );
};

exports.down = async function (db) {
    await db.removeColumn('reports', 'source_id');
    await db.dropTable('sources');
};

exports._meta = {
    version: 1
};
