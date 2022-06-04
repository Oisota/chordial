function initIcons() {
	lucide.createIcons({
		attrs: {
			width: '16',
			height: '16',
		}
	});
}

function main() {
	const { createApp } = Vue


  createApp({
		updated() {
			initIcons();
		},
    data() {
      return {
        songTitle: 'Proud Mary',
				artistName: 'Creedence Clearwater Revival',
				/*
					TODO: want to be able to add 'section' markers like 'Verse 1', 'Chorus', 'Bridge', etc
					How should data structure be updated to support this?
				*/
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
      };
    },
		methods: {
			handlePrint() {
				window.print();
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
			removeSection(index) {
				this.sections.splice(index, 1);
			},
			addLine(index) {
				this.sections[index].lines.push([{chord: '', text: ''}]);
			},
			removeLine(sectionIndex, lineIndex) {
				this.sections[sectionIndex].lines.splice(lineIndex, 1);
			},
			addLyric(sectionIndex, lineIndex) {
				this.sections[sectionIndex]
					.lines[lineIndex]
					.push({chord: '', text: ''});
			},
			removeLyric(sectionIndex, lineIndex, lyricIndex) {
				this.sections[sectionIndex]
					.lines[lineIndex]
					.splice(lyricIndex, 1);
			},
		}
  }).mount('#app');
}

document.addEventListener('DOMContentLoaded', (e) => {
	main();
	initIcons();
});
