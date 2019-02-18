import { curry } from '@/utils/Base';
import fs from 'fs';
export const DB_PROJECTS = Symbol.for('projects');
export const DB_PROJECTS_MOCKS = Symbol.for('project_mocks');
export const DB_SYSTEM = Symbol.for('system');
const DBS = {
  [DB_PROJECTS]: 'mocks/projects',
  [DB_PROJECTS_MOCKS]: 'mocks/',
  [DB_SYSTEM]: 'system/config',
};
const dbcache = {};
const Datastore = require('nedb');

// 当dbname是非固定值时使用
export function dynamicInsert(dbname, data, callback = function () {}) {
  let db = dbcache[dbname];
  if (!db) {
    dbcache[dbname] = db = new Datastore({
      filename: dbname,
      autoload: true,
    });
  }

  db.insert(data, callback);
}

// 当dbname是非固定值时使用
export function dynamicRemove(dbname, query, callback = function () {}) {
  let db = dbcache[dbname];
  if (!db) {
    dbcache[dbname] = db = new Datastore({
      filename: dbname,
      autoload: true,
    });
  }

  db.remove(query, { multi: true }, callback);
  db.persistence.compactDatafile();
}

// 当dbname是非固定值时使用
export function dynamicUpdate(dbname, query, data, callback = function () {}) {
  let db = dbcache[dbname];
  if (!db) {
    dbcache[dbname] = db = new Datastore({
      filename: dbname,
      autoload: true,
    });
  }
  db.update(query, data, { upsert: true }, callback);
}

export function dynamicFind(dbname, query, callback = function () {}) {
  let db = dbcache[dbname];
  if (!db) {
    dbcache[dbname] = db = new Datastore({
      filename: dbname,
      autoload: true,
    });
  }

  db.find(query, callback);
}

export function insert(db_symbol, data, callback = function () {}) {
  const dbname = DBS[db_symbol];
  if (!dbname) {
    throw 'no such dbname';
  }

  dynamicInsert(dbname, data, callback);
}

export function find(db_symbol, query, callback = function () {}) {
  const dbname = DBS[db_symbol];
  if (!dbname) {
    throw 'no such dbname';
  }

  dynamicFind(dbname, query, callback);
}

export function remove(db_symbol, query, callback = function () {}) {
  const dbname = DBS[db_symbol];
  if (!dbname) {
    throw 'no such dbname';
  }

  dynamicRemove(dbname, query, callback);
}


export function update(db_symbol, query, data, callback = function () {}) {
  const dbname = DBS[db_symbol];
  if (!dbname) {
    throw 'no such dbname';
  }

  dynamicUpdate(dbname, query, data, callback);
}


// 删除表
export function deleteTable(path) {
  fs.unlinkSync(path);
}
