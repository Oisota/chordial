<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Preview from './Preview.vue';
import SongInput from './SongInput.vue';

const route = useRoute();
const uuid = ref(route.params.uuid);
console.log(`Route UUID = ${uuid.value}`)
</script>

<template>
	<div class="row">
		<!-- Lyric Data -->
		<div class="col-xl-6 border-end border-secondary py-2 d-print-none bg-dark">
			<SongInput :uuid="uuid.value"/>
		</div>

		<!-- Preview -->
		<div class="col-xl-6 pt-2">
			<Preview/>
		</div>
	</div>
</template>

<style scoped>
</style>
