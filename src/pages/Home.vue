<script setup lang="ts">
import { ref} from 'vue';

import SongList from '../components/SongList.vue';

const searchText = ref('');
</script>

<template>
	<div class="row mt-2">
		<div class="col-xl-6 offset-xl-3">
			<input v-model="searchText" type="text" class="form-control mb-2" placeholder="Search Songs">
			<SongList :searchText="searchText"/>
		</div>
	</div>
</template>

<style scoped>
</style>
