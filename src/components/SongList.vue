<script setup lang="ts">
import { ref } from 'vue';
import { useSongsStore } from '../stores/all-songs';
import { Pencil, Plus } from 'lucide-vue-next';
import { Song } from '../types';
import { PouchDocType } from '../db';
import { v4 as uuid4 } from 'uuid';

const songs = useSongsStore();
songs.load();
const newSongInput = ref(null);
const songName = ref('');

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

function edit(index: number) {
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
		<li v-for="(song, index) in songs.songs" class="list-group-item d-flex flex-row justify-content-between align-items-center">
			<span>{{song.title}}</span>
			<button type="button" class="btn btn-warning" v-on:click="edit(index)">
				<Pencil size="16"/>
			</button>
		</li>
	</ul>
</template>

<style scoped>
</style>
