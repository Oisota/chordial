<script setup lang="ts">
import { Section } from '../types';

defineProps<{
	songTitle: string,
	artistName: string,
	sections: Array<Section>
}>();

function handlePrint() {
	window.print();
}
</script>

<template>
	<div class="d-flex flex-row justify-content-end d-print-none">
		<button v-on:click="handlePrint" type="button" class="btn btn-sm btn-primary">Print</button>
	</div>
	<div class="d-flex flex-column align-items-center mb-2">
		<h3 class="mb-0">{{songTitle}}</h3>
		<span class="fs-5">{{artistName}}</span>
	</div>

	<div v-for="section in sections" class="pb-2">
		<div v-if="section.title" class="fw-bold">{{ section.title }}</div>
		<div v-for="line in section.lines" class="d-flex flex-row pb-2">
			<span v-for="lyric in line" class="d-flex flex-column pe-2">
				<span class="fw-bold">{{lyric.chord}}</span>
				<span>{{lyric.text}}</span>
			</span>
		</div>
	</div>
</template>

<style scoped></style>