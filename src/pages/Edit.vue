<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Preview from '../components/Preview.vue';
import SongInput from '../components/SongInput.vue';

const route = useRoute();
const uuid = ref(route.params.uuid);
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
