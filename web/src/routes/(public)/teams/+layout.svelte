<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<title>VHEconomy: Teams</title>
	<meta name="description" content="A cool description" />
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
