import { defineStore } from 'pinia';
import db from '../db';
import { Song } from '../types';

export const useSongStore = defineStore('song', {
	state: () => ({
		title: 'Proud Mary',
		artist: 'Creedence Clearwater Revival',
		sections: [
			{
				title: 'Verse 1',
				lines: [
					[
						{chord: 'D', text: 'Left a good job in the city,'},
						{chord: 'D', text: 'Workin for the man every night and day.'},
					],
					[
						{chord: 'D', text: 'And I never lost a minute of sleepin,'},
						{chord: 'D', text: 'Worrying bout the way things might have been.'},
					],
				],
			},
			{
				title: 'Chorus',
				lines: [
					[
						{chord: 'A', text: 'Big wheel will keep on turnin'},
						{chord: 'Bm', text: 'Proud Mary keep on burnin'},
					],
					[
						{chord: 'D', text: 'Rollin, rollin, rollin on a river'},
					]
				]
			},
			{
				title: 'Verse 2',
				lines: [
					[
						{chord: 'D', text: 'Cleaned a lot of plates in Memphis,'},
						{chord: 'D', text: 'Pumped a lot of pain down in New Orleans'},
					],
					[
						{chord: 'D', text: 'But I never saw the good side of the city,'},
						{chord: 'D', text: 'Till I hitched a ride on a river boat queen.'},
					],
				],
			},
		]
	}),
	actions: {
		async load(uuid: string) {
			const song = await db.get<Song>(uuid);
			console.log(song);
			this.title = song.title;
			this.artist = song.artist;
			this.sections = song.sections;
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