<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
	<Navbar></Navbar>
	<div class="container-fluid border-top border-light">
		<RouterView></RouterView>
	</div>
</template>

<style>
</style>
