import { defineStore } from 'pinia';
import { cloneDeep } from 'lodash';

import db from '../db';
import { Song } from '../types';
import { PouchDocType } from '../db';

export const useSongStore = defineStore('song', {
	state: () => ({
		_id: '',
		_rev: '',
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
				console.log(err);
				return Promise.reject(err);
			}
			this.title = song.title;
			this.artist = song.artist;
			this.sections = song.sections;
			this.type = song.type;
			this._id = song._id;
			this._rev = song._rev;
		},
		async update() {
			const song = {
				_id: this._id,
				_rev: this._rev,
				type: this.type,
				title: this.title,
				artist: this.artist,
				sections: this.sections,
			};
			try {
				const result = await db.put(song);
				this._rev = result.rev;
			} catch (err) {
				console.log(err);
			}
		},

		// section functions
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
		duplicateSection(index: number) {
			const section = cloneDeep(this.sections[index]);
			this.sections.splice(index, 0, section);
		},
		moveSectionUp(index: number) {
			if (index === 0) {
				return;
			}
			const section = this.sections[index];
			this.sections[index] = this.sections[index - 1];
			this.sections[index - 1] = section;
		},
		moveSectionDown(index: number) {
			if (index + 1 >= this.sections.length) {
				return;
			}
			const section = this.sections[index];
			this.sections[index] = this.sections[index + 1];
			this.sections[index + 1] = section;
		},

		// line functions
		addLine(index: number) {
			this.sections[index].lines.push([{chord: '', text: ''}]);
		},
		removeLine(sectionIndex: number, lineIndex: number) {
			this.sections[sectionIndex].lines.splice(lineIndex, 1);
		},
		duplicateLine(sectionIndex: number, lineIndex: number) {
			const line = this.sections[sectionIndex].lines[lineIndex];
			this.sections[sectionIndex].lines.splice(lineIndex, 0, line.slice());
		},
		moveLineUp(sectionIndex: number, lineIndex: number) {
			if (lineIndex === 0) {
				return;
			}
			const line = this.sections[sectionIndex].lines[lineIndex];
			this.sections[sectionIndex].lines[lineIndex] = this.sections[sectionIndex].lines[lineIndex - 1];
			this.sections[sectionIndex].lines[lineIndex - 1] = line;
		},
		moveLineDown(sectionIndex: number, lineIndex: number) {
			if (lineIndex + 1 >= this.sections[sectionIndex].lines.length) {
				return;
			}
			const line = this.sections[sectionIndex].lines[lineIndex];
			this.sections[sectionIndex].lines[lineIndex] = this.sections[sectionIndex].lines[lineIndex + 1];
			this.sections[sectionIndex].lines[lineIndex + 1] = line;
		},

		// lyric functions
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
		duplicateLyric(sectionIndex: number, lineIndex: number, lyricIndex: number) {
			const lyric = this.sections[sectionIndex].lines[lineIndex][lyricIndex];
			this.sections[sectionIndex].lines[lineIndex].splice(lyricIndex, 0, cloneDeep(lyric));
		},
		moveLyricUp(sectionIndex: number, lineIndex: number, lyricIndex: number) {
			if (lyricIndex === 0) {
				return;
			}
			const lyric = this.sections[sectionIndex].lines[lineIndex][lyricIndex];
			this.sections[sectionIndex].lines[lineIndex][lyricIndex] = this.sections[sectionIndex].lines[lineIndex][lyricIndex - 1];
			this.sections[sectionIndex].lines[lineIndex][lyricIndex - 1] = lyric;
		},
		moveLyricDown(sectionIndex: number, lineIndex: number, lyricIndex: number) {
			if (lyricIndex + 1 >= this.sections[sectionIndex].lines[lineIndex].length) {
				return;
			}
			const lyric = this.sections[sectionIndex].lines[lineIndex][lyricIndex];
			this.sections[sectionIndex].lines[lineIndex][lyricIndex] = this.sections[sectionIndex].lines[lineIndex][lyricIndex + 1];
			this.sections[sectionIndex].lines[lineIndex][lyricIndex + 1] = lyric;
		},
	}
});