<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useSongsStore } from '../stores/all-songs';
import { Pencil, Plus, Trash } from 'lucide-vue-next';
import { Song } from '../types';
import { PouchDocType } from '../db';
import { v4 as uuid4 } from 'uuid';

const songs = useSongsStore();
const newSongInput = ref(null);
const songName = ref('');

onBeforeMount(() => {
	songs.load();
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
</script>

<template>
	<ul class="list-group">
		<li class="list-group-item d-flex flex-row justify-content-between align-items-center">
			<input class="form-control me-3" type="text" placeholder="Add New Song Name Here" v-model="songName" ref="newSongInput" v-on:keyup.enter="add">
			<button type="button" class="btn btn-primary" v-on:click="add">
				<Plus size="16"/>
			</button>
		</li>
		<li v-for="song in songs.songs" class="list-group-item d-flex flex-row justify-content-between align-items-center">
			<span>{{song.title}}</span>
			<div class="btn-group">
				<button type="button" class="btn btn-danger" v-on:click="remove(song)">
					<Trash size="15"></Trash>
				</button>
				<router-link class="btn btn-warning" :to="{name: 'edit', params: {uuid: song._id}}">
					<Pencil size="16"/>
				</router-link>
			</div>
		</li>
	</ul>
</template>

<style scoped>
</style>
