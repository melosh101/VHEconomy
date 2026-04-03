<script lang="ts">
	import { page } from '$app/state';

	const user = $derived(page.data.user);
</script>

<header class="mx-6 my-4 flex justify-between">
	<a href="/" class="text-2xl">VHEconomy</a>
	<nav class="flex justify-center align-middle">
		<ul class="flex flex-row gap-4 text-lg">
			<li class="flex"><a class="my-auto" href="/teams">Teams</a></li>
			<li class="flex"><a class="my-auto" href="/items">Items</a></li>
			<li class="flex"><a class="my-auto" href="/fun">Fun</a></li>
		</ul>
	</nav>

	{#if !user}
		<a href="/login">youre not logged in please do</a>
	{:else}
		<a href="/profile" class="flex flex-row gap-2">
			<img src={user.image} alt="no pfp" class="size-12 rounded-full" />
			<p class="my-auto">{user.name}</p>
		</a>
	{/if}
</header>
