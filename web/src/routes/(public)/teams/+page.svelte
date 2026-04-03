<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
</script>

<li>{JSON.stringify(data.user)}</li>

<h1>Teams</h1>
{#if data.teams.length == 0}
	<h2>The Teams have yet to be distrobuted</h2>
{:else}
	{#each data.teams as team}
		<section class="mx-8 border border-gray-700 p-2">
			<h2>{team.name}</h2>
			<h3>Players in the team!</h3>
			<ul>
				{#each team.players as player}
					<li class="flex flex-row gap-2 text-center">
						{#if player.ign}
							<img
								src={`https://minotar.net/avatar/${player.ign}/64`}
								alt=""
								class="size-8 rounded-md"
							/>
							{player.ign}
						{:else}
							<img src={player.image} alt="" class="size-8 rounded-full" />
							{player.name}
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
{/if}
