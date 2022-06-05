export interface Song {
	songTitle: string
	artistName: string
	sections: Array<Section>
}

export interface Section {
	title: string
	lines: Array<Array<Lyric>>
}

export interface Lyric {
	chord: string
	text: string
}
