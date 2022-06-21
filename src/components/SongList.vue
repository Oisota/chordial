<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Pencil, Plus, Trash } from 'lucide-vue-next';
import { v4 as uuid4 } from 'uuid';

import { useSongsStore } from '../stores/all-songs';
import { Song } from '../types';
import { PouchDocType } from '../db';

const props = defineProps<{
	searchText: string
}>();

const router = useRouter();
const songs = useSongsStore();
const newSongInput = ref(null);
const songName = ref('');

onBeforeMount(async () => {
	return songs.load();
});

const filteredSongs = computed(() => {
	if (!props.searchText) {
		return songs.songs;
	}
	return songs.songs.filter((s: Song) => {
		const titleMatch = s.title.includes(props.searchText);
		const artistMatch = s.artist.includes(props.searchText);
		return titleMatch || artistMatch;
	});
});

function add() {
	if (!songName.value) {
		return
	}
	const song: Song = {
		_id: uuid4(),
		title: songName.value,
		artist: '',
		type: PouchDocType.SONG,
		sections: [],
	}
	songs.add(song);
	songName.value = '';
}
function remove(song: Song) {
	songs.remove(song);
}
function viewSong(song: Song, event: Event) {
	if (event.target && !event.target.classList.contains('list-group-item-action')) {
		return;
	}
	// check if other buttons were clicked and stop navigation so other buttons can be handled
	router.push({
		name: 'view',
		params: {
			uuid: song._id,
		}
	});
}
</script>

<template>
	<div class="list-group">
		<div class="list-group-item d-flex flex-row justify-content-between align-items-center">
			<input class="form-control me-3" type="text" placeholder="Add New Song Name Here" v-model="songName" ref="newSongInput" v-on:keyup.enter="add">
			<button type="button" class="btn btn-primary" v-on:click="add">
				<Plus size="16"/>
			</button>
		</div>
		<button v-for="song in filteredSongs" type="button" v-on:click="viewSong(song, $event)" class="list-group-item list-group-item-action d-flex flex-row justify-content-between align-items-center">
			<span>
				{{song.title}}
				<small class="text-secondary ms-2">{{song.artist}}</small>
			</span>
			
			<div class="btn-group">
				<button type="button" class="btn btn-danger" v-on:click="remove(song)">
					<Trash size="15"></Trash>
				</button>
				<router-link class="btn btn-warning" :to="{name: 'edit', params: {uuid: song._id}}">
					<Pencil size="16"/>
				</router-link>
			</div>
		</button>
	</div>
</template>

<style scoped>
</style>
