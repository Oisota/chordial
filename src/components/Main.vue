<script setup lang="ts">
import Preview from './Preview.vue';
import SongInput from './SongInput.vue';
</script>

<template>
	<div class="row">
		<!-- Lyric Data -->
		<div class="col-xl-6 border-end border-secondary py-2 d-print-none bg-dark">
			<SongInput/>
		</div>

		<!-- Preview -->
		<div class="col-xl-6 pt-2">
			<Preview/>
		</div>
	</div>
</template>

<style scoped>
</style>
