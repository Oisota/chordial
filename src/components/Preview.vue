<script setup lang="ts">
import { Song } from '../types';

const props = defineProps<{
	song: Song
}>();

function handlePrint() {
	window.print();
}
</script>

<template>
	<div>
		<div class="d-flex flex-row justify-content-end d-print-none">
			<button v-on:click="handlePrint" type="button" class="btn btn-sm btn-primary">Print</button>
		</div>
		<div class="d-flex flex-column align-items-center mb-2">
			<h3 class="mb-0">{{song.title}}</h3>
			<span class="fs-5">{{song.artist}}</span>
		</div>

		<div v-for="section in song.sections" class="pb-2">
			<div v-if="section.title" class="fw-bold">{{ section.title }}</div>
			<div v-for="line in section.lines" class="d-flex flex-row pb-2">
				<span v-for="lyric in line" class="d-flex flex-column pe-2">
					<span v-if="lyric.chord" class="fw-bold">{{lyric.chord}}</span>
					<span v-else class="fw-bold">&nbsp;</span>
					<span>{{lyric.text}}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped></style>