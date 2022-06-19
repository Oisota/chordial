<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

import { useSongStore } from '../stores/song';
import Preview from '../components/Preview.vue';

const route = useRoute();
const song = useSongStore();
const uuid = route.params.uuid as string;

onMounted(async () => {
	await song.load(uuid);
});

async function updateSong() {
	song.update();
}
</script>

<template>
	<div class="row">
		<div class="col-xl-6 offset-xl-3 pt-2">
			<Preview :song="song"/>
		</div>
	</div>
</template>

<style scoped>
</style>
