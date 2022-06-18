<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
	<main>
		<Navbar></Navbar>
		<div class="container-fluid border-top border-light">
			<RouterView></RouterView>
		</div>
	</main>
</template>

<style>
</style>
