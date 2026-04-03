<script lang="ts">
	import Wheel from '$lib/components/Wheel.svelte';
	import { type teamsSelect } from '$lib/server/db/schema';

	const teams: teamsSelect[] = [
		{
			name: 'mels test team',
			color: '#FF00FF',
			id: 'test'
		},
		{
			name: 'mels worst team',
			color: '#FFF00F',
			id: 'test2'
		},
		{
			name: 'mels best team',
			color: '#00FFFF',
			id: 'test3'
		},
		{
			name: 'another team',
			color: '#00FF00',
			id: 'test4'
		}
	];

	const wheelItems = teams
		.filter((team) => team.name)
		.map((team) => ({ id: team.id, name: team.name!, value: 1 }));

	let wheel1: ReturnType<typeof Wheel>;
	let wheel2: ReturnType<typeof Wheel>;
	let spinning = $state(false);

	let winner1 = $state<string | null>(null);
	let winner2 = $state<string | null>(null);

	function spinBoth() {
		if (spinning) return;
		spinning = true;
		winner1 = null;
		winner2 = null;

		wheel1.spin(Math.random() * 0.2 + 0.25);
		wheel2.spin(Math.random() * 0.2 + 0.25);

		// Simple way to reset spinning state for the button
		// In a real app we might wait for both onStop callbacks
		setTimeout(() => {
			spinning = false;
		}, 5000);
	}
</script>

<svelte:head>
	<title>Wheel of Fortune</title>
</svelte:head>

<div class="flex flex-col items-center gap-8 py-8 text-center">
	<h1 class="text-4xl font-black">Wheel of Fortune</h1>
	<div class="flex flex-wrap justify-center gap-12">
		<div class="flex flex-col items-center gap-4">
			<Wheel bind:this={wheel1} items={wheelItems} onStop={(name) => (winner1 = name)} />
			{#if winner1}
				<div
					class="animate-bounce rounded-lg bg-slate-100 px-4 py-2 font-bold text-slate-700 shadow-sm"
				>
					Winner: {winner1}
				</div>
			{/if}
		</div>
		<div class="flex flex-col items-center gap-4">
			<Wheel bind:this={wheel2} items={wheelItems} onStop={(name) => (winner2 = name)} />
			{#if winner2}
				<div
					class="animate-bounce rounded-lg bg-slate-100 px-4 py-2 font-bold text-slate-700 shadow-sm"
				>
					Winner: {winner2}
				</div>
			{/if}
		</div>
	</div>

	<button
		onclick={spinBoth}
		disabled={spinning}
		class="min-w-[200px] rounded-full bg-red-600 px-10 py-5 text-3xl font-black tracking-tighter text-white shadow-2xl transition-all hover:scale-110 hover:bg-red-700 active:scale-95 disabled:bg-slate-500 disabled:opacity-50"
	>
		SPIN BOTH!
	</button>
</div>
