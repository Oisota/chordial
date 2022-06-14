import PouchDB from 'pouchdb-browser';
import { Database } from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind);

const db = new PouchDB('chordial');

(window as any).db = db;
export default db;

// central definition of different document
// types used for categorizing pouchdb documents
export enum PouchDocType {
	SONG = 'SONG'
}

const appIndexes = [
	{
		name: 'idx_type',
		fields: ['type'],
	}
];

// create indexes if not created already
export async function createIndexes(db: Database) {
	// loop over indexes creating if not already created
	const promises = appIndexes.map((index) => db.createIndex({index}))

	try {
		await Promise.all(promises);
	} catch (err) {
		console.error('Error creating database indexes');
		console.error(err);
	}
}