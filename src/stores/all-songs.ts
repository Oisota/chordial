import { defineStore } from 'pinia';
import db from '../db';
import { PouchDocType } from '../db';
import { Song } from '../types';

export const useSongsStore = defineStore('allSongs', {
	state: () => ({
		songs: []
	}),
	actions: {
		async load() {
			let result = {};
			try {
				result = await db.find({
					selector: {
						type: PouchDocType.SONG,
					},
				});
			} catch (err) {
				console.error(err);
				return Promise.reject(err);
			}
			(this.songs as Array<Song>) = (result.docs as unknown as Array<Song>);
		},
		async add(song: Song) {
			this.songs.push(song);
			return db.put(song);
		},
		async remove(song: Song) {
			const doc = await db.get(song._id);
			await db.remove(doc);
			return this.load();
		}
	}
});