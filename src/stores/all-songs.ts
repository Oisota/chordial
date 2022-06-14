import { defineStore } from 'pinia';
import db from '../db';
import { PouchDocType } from '../db';
import { Song } from '../types';

export const useSongsStore = defineStore('song', {
	state: () => ({
		songs: []
	}),
	actions: {
		async load() {
			const result = await db.find({
				selector: {
					type: PouchDocType.SONG,
				},
			});
			this.songs = (result.docs as unknown as Array<Song>);
		},
		async add(song: Song) {
			this.songs.push(song);
			await db.put(song);
		},
	}
});