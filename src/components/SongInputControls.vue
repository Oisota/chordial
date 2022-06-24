
<script setup lang="ts">
import { Trash, Copy, ChevronUp, ChevronDown } from 'lucide-vue-next';

defineEmits(['up', 'down', 'copy', 'delete']);

const props = defineProps<{
	upTitle: string
	downTitle: string
	copyTitle: string
	deleteTitle: string
}>();
</script>

<template>
	<div class="btn-group">
		<button v-bind:title="props.upTitle" type="button" class="btn btn-sm btn-primary" v-on:click="$emit('up')">
			<ChevronUp size="16"/>
		</button>
		<button v-bind:title="props.downTitle" type="button" class="btn btn-sm btn-primary" v-on:click="$emit('down')">
			<ChevronDown size="16"/>
		</button>
		<button v-bind:title="props.copyTitle" type="button" class="btn btn-sm btn-primary" v-on:click="$emit('copy')">
			<Copy size="16"/>
		</button>
		<button v-bind:title="props.deleteTitle" type="button" class="btn btn-sm btn-dark" v-on:click="$emit('delete')">
			<Trash size="16"/>
		</button>
	</div>
</template>

<style scoped></style>