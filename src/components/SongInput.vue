<script setup lang="ts">
import debounce from 'lodash/debounce'
import { Plus } from 'lucide-vue-next';
import { Song } from '../types';
import SongInputControls from './SongInputControls.vue'

const emit = defineEmits(['input']);

const props = defineProps<{
	song: Song
}>();

const input = debounce(() => {
	emit('input');
}, 500);
</script>

<template>
	<form v-on:input="input">
		<div class="bg-secondary text-light p-2 mb-3 rounded">
			<div class="row mb-1">
				<label class="col-sm-2 col-form-label col-form-label-sm" for="song-title">Song Title</label>
				<div class="col-sm-10">
					<input class="form-control form-control-sm" name="song-title" type="text" v-model="song.title">
				</div>
			</div>
			<div class="row">
				<label class="col-sm-2 col-form-label col-form-label-sm" for="artist-name">Artist Name</label>
				<div class="col-sm-10">
					<input class="form-control form-control-sm" name="artist-name" type="text" v-model="song.artist">
				</div>
			</div>
		</div>

		<div v-for="(section, sectionIndex) in song.sections" class="rounded bg-secondary text-light py-2 mb-3">

			<div class="row pb-2 px-2">
				<label class="col-sm-2 col-form-label col-form-label-sm" for="">Section</label>
				<div class="col-sm-7">
					<input class="form-control form-control-sm" type="text" placeholder="section title" v-model="section.title">
				</div>
				<div class="col-sm-3">
					<div class="d-flex flex-row justify-content-end">
						<SongInputControls
							up-title="Move Section Up"
							down-title="Move Section Down"
							copy-title="Duplicate Section"
							delete-title="Remove Section"
							v-on:up="song.moveSectionUp(sectionIndex)"
							v-on:down="song.moveSectionDown(sectionIndex)"
							v-on:copy="song.duplicateSection(sectionIndex)"
							v-on:delete="song.removeSection(sectionIndex)"
						></SongInputControls>
					</div>
				</div>
			</div>

			<div v-for="(line, lineIndex) in section.lines" class="p-2 border-top border-dark bg-secondary">
				<div class="d-flex flex-row align-items-center justify-content-between mb-2">
					<small>Line</small>
					<SongInputControls
						up-title="Move Line Up"
						down-title="Move Line Down"
						copy-title="Duplicate Line"
						delete-title="Remove Line"
						v-on:up="song.moveLineUp(sectionIndex, lineIndex)"
						v-on:down="song.moveLineDown(sectionIndex, lineIndex)"
						v-on:copy="song.duplicateLine(sectionIndex, lineIndex)"
						v-on:delete="song.removeLine(sectionIndex, lineIndex)"
					></SongInputControls>
				</div>
				<div v-for="(lyric, lyricIndex) in line" class="row mb-1">
					<div class="col-sm-2">
						<input class="form-control form-control-sm" type="text" placeholder="chord" v-model="lyric.chord">
					</div>
					<div class="col-sm-10">
						<div class="d-flex flex-row">
							<input class="form-control form-control-sm me-2" type="text" placeholder="lyric" v-model="lyric.text">
							<SongInputControls
								up-title="Move Lyric Up"
								down-title="Move Lyric Down"
								copy-title="Duplicate Lyric"
								delete-title="Remove Lyric"
								v-on:up="song.moveLyricUp(sectionIndex, lineIndex, lyricIndex)"
								v-on:down="song.moveLyricDown(sectionIndex, lineIndex, lyricIndex)"
								v-on:copy="song.duplicateLyric(sectionIndex, lineIndex, lyricIndex)"
								v-on:delete="song.removeLyric(sectionIndex, lineIndex, lyricIndex)"
							></SongInputControls>
						</div>
					</div>
				</div>

				<div class="d-flex flex-row justify-content-end">
					<button title="Insert Lyric" type="button" class="btn btn-sm btn-primary" v-on:click="song.addLyric(sectionIndex, lineIndex)">
						<Plus size="16"/>
					</button>
				</div>

			</div>
			<div class="d-flex flex-row justify-content-end pt-2 px-2 border-top border-dark">
				<button title="Insert New Line" type="button" class="btn btn-sm btn-primary" v-on:click="song.addLine(sectionIndex)">
					<Plus size="16"/>
				</button>
			</div>

		</div>
		<div class="d-flex flex-row justify-content-end">
			<div class="btn-group">
				<button title="Insert New Section" type="button" class="btn btn-sm btn-primary" v-on:click="song.addSection">
					<Plus size="16"/>
				</button>
			</div>
		</div>

	</form>
</template>

<style scoped></style>