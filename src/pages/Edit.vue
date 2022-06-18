<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useSongStore } from '../stores/song';
import Preview from '../components/Preview.vue';
import SongInput from '../components/SongInput.vue';

const route = useRoute();
const song = useSongStore();
const uuid = route.params.uuid as string;
onMounted(async () => {
	console.log('Calling Song Load');
	await song.load(uuid);
});

function updateSong() {
	console.log('Update Song');
}
</script>

<template>
	<div class="row">
		<!-- Lyric Data -->
		<div class="col-xl-6 border-end border-secondary py-2 d-print-none bg-dark">
			<SongInput :song="song" v-on:input="updateSong"/>
		</div>

		<!-- Preview -->
		<div class="col-xl-6 pt-2">
			<Preview :song="song"/>
		</div>
	</div>
</template>

<style scoped>
</style>
