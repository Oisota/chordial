import { defineStore } from 'pinia';
import db from '../db';
import { Song } from '../types';
import { PouchDocType } from '../db';

export const useSongStore = defineStore('song', {
	state: () => ({
		_id: '',
		type: PouchDocType.SONG,
		title: '',
		artist: '',
		sections: []
	}),
	actions: {
		async load(uuid: string) {
			let song = null;
			try {
				song = await db.get<Song>(uuid);
			} catch (err) {
				console.log('Song Load Error');
				console.log(`UUID = ${uuid}`);
				console.log(err);
				return Promise.reject(err);
			}
			this.title = song.title;
			this.artist = song.artist;
			this.sections = song.sections;
			this.type = song.type;
			this._id = song._id;
		},
		addSection() {
			this.sections.push({
				title: '',
				lines: [
					[
						{chord: '', text: ''}
					]
				]
			});
		},
		removeSection(index: number) {
			this.sections.splice(index, 1);
		},
		addLine(index: number) {
			this.sections[index].lines.push([{chord: '', text: ''}]);
		},
		removeLine(sectionIndex: number, lineIndex: number) {
			this.sections[sectionIndex].lines.splice(lineIndex, 1);
		},
		addLyric(sectionIndex: number, lineIndex: number) {
			this.sections[sectionIndex]
				.lines[lineIndex]
				.push({chord: '', text: ''});
		},
		removeLyric(sectionIndex: number, lineIndex: number, lyricIndex: number) {
			this.sections[sectionIndex]
				.lines[lineIndex]
				.splice(lyricIndex, 1);
		},
	}
});