import { PouchDocType } from './db'
export interface Song {
	_id: string
	title: string
	artist: string
	type: PouchDocType
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
