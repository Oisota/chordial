<script setup lang="ts">
import { ref, Ref } from 'vue'
import { Plus, Trash } from 'lucide-vue-next';
import Preview from './Preview.vue';
import { Section } from '../types';

const songTitle = ref('Proud Mary');
const artistName = ref('Creedence Clearwater Revival');
const sections: Ref<Array<Section>> = ref([
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
]);
function addSection() {
	sections.value.push({
		title: '',
		lines: [
			[
				{chord: '', text: ''}
			]
		]
	});
}
function removeSection(index: number) {
	sections.value.splice(index, 1);
}
function addLine(index: number) {
	sections.value[index].lines.push([{chord: '', text: ''}]);
}
function removeLine(sectionIndex: number, lineIndex: number) {
	sections.value[sectionIndex].lines.splice(lineIndex, 1);
}
function addLyric(sectionIndex: number, lineIndex: number) {
	sections.value[sectionIndex]
		.lines[lineIndex]
		.push({chord: '', text: ''});
}
function removeLyric(sectionIndex: number, lineIndex: number, lyricIndex: number) {
	sections.value[sectionIndex]
		.lines[lineIndex]
		.splice(lyricIndex, 1);
}
</script>

<template>
	<div class="row">
		<!-- Lyric Data -->
		<div class="col-xl-6 border-end border-secondary py-2 d-print-none bg-dark">
			<form>
				<div class="bg-secondary text-light p-2 mb-3 rounded">
					<div class="row mb-1">
						<label class="col-sm-2 col-form-label col-form-label-sm" for="song-title">Song Title</label>
						<div class="col-sm-10">
							<input class="form-control form-control-sm" name="song-title" type="text" v-model="songTitle">
						</div>
					</div>
					<div class="row">
						<label class="col-sm-2 col-form-label col-form-label-sm" for="artist-name">Artist Name</label>
						<div class="col-sm-10">
							<input class="form-control form-control-sm" name="artist-name" type="text" v-model="artistName">
						</div>
					</div>
				</div>

				<div v-for="(section, sectionIndex) in sections" class="rounded bg-secondary text-light py-2 mb-3">

					<div class="row pb-2 px-2">
						<label class="col-sm-2 col-form-label col-form-label-sm" for="">Section</label>
						<div class="col-sm-7">
							<input class="form-control form-control-sm" type="text" placeholder="section title" v-model="section.title">
						</div>
						<div class="col-sm-3">
							<div class="d-flex flex-row justify-content-end">
								<button title="Delete Section" type="button" class="btn btn-sm btn-danger" v-on:click="removeSection(sectionIndex)">
									<Trash size="16"/>
								</button>
							</div>
						</div>
					</div>

					<div v-for="(line, lineIndex) in section.lines" class="p-2 border-top border-dark bg-secondary">
						<div class="d-flex flex-row align-items-center justify-content-between mb-2">
							<small>Line</small>
							<button title="Delete Line" type="button" class="btn btn-sm btn-danger" v-on:click="removeLine(sectionIndex, lineIndex)">
								<Trash size="16"/>
							</button>
						</div>
						<div v-for="(lyric, lyricIndex) in line" class="row mb-1">
							<div class="col-sm-2">
								<input class="form-control form-control-sm" type="text" placeholder="chord" v-model="lyric.chord">
							</div>
							<div class="col-sm-10">
								<div class="input-group">
									<input class="form-control form-control-sm" type="text" placeholder="lyric" v-model="lyric.text">
									<button title="Delete Lyric" type="button" class="btn btn-sm btn-danger" v-on:click="removeLyric(sectionIndex, lineIndex, lyricIndex)">
										<Trash size="16"/>
									</button>
								</div>
							</div>
						</div>

						<div class="d-flex flex-row justify-content-end">
							<button title="Insert Lyric" type="button" class="btn btn-sm btn-primary" v-on:click="addLyric(sectionIndex, lineIndex)">
								<Plus size="16"/>
							</button>
						</div>

					</div>
					<div class="d-flex flex-row justify-content-end pt-2 px-2 border-top border-dark">
							<button title="Insert New Line" type="button" class="btn btn-sm btn-primary" v-on:click="addLine(sectionIndex)">
								<Plus size="16"/>
							</button>
					</div>

				</div>
				<div class="d-flex flex-row justify-content-end">
					<div class="btn-group">
						<button title="Insert New Section" type="button" class="btn btn-sm btn-primary" v-on:click="addSection">
							<Plus size="16"/>
						</button>
					</div>
				</div>

			</form>
		</div>

		<!-- Preview -->
		<div class="col-xl-6 pt-2">
			<Preview v-bind:songTitle="songTitle" v-bind:artistName="artistName" v-bind:sections="sections" />
		</div>

	</div>
</template>

<style scoped>
</style>
