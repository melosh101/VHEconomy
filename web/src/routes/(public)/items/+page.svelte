<script lang="ts">
	import type { PageData } from './$types';
	import Fuse from 'fuse.js';

	let { data } = $props<{ data: PageData }>();

	let searchQuery = $state('');

	const fuse = $derived(
		new Fuse(data.items, {
			keys: ['item', 'category.title', 'team.name', 'automated'],
			threshold: 0.3
		})
	);

	let filteredItems = $derived(
		searchQuery.trim() === '' ? data.items : fuse.search(searchQuery).map((r) => r.item)
	);
	function getHighResImg(url: string | null) {
		if (!url) return '/placeholder-item.png';
		// If it's a wiki FilePath URL, we can request a specific width
		if (url.includes('wiki.vaulthunters.gg/Special:FilePath/')) {
			return `${url}?width=256`;
		}
		return url;
	}
</script>

<div class="mx-auto max-w-7xl p-6">
	<div class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
		<div>
			<h1 class="text-4xl font-bold tracking-tight">Items Catalog</h1>
			<p class="text-muted-foreground mt-1 text-lg">Browse items, variations, and ownership.</p>
		</div>
		<div class="w-full md:max-w-xs">
			<input
				type="text"
				placeholder="Search items, categories, or teams..."
				bind:value={searchQuery}
				class="input input-bordered w-full shadow-sm"
			/>
		</div>
	</div>

	{#if filteredItems.length === 0}
		<div
			class="bg-base-200 flex h-64 items-center justify-center rounded-2xl border-2 border-dashed"
		>
			<p class="text-muted-foreground text-xl">No items found matching "{searchQuery}"</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredItems as i (i.id)}
				<div
					class="card bg-base-100 border-base-300 group overflow-hidden border shadow-sm transition-all hover:shadow-md"
				>
					<figure class="bg-base-200 relative aspect-square overflow-hidden p-8">
						<img
							src={getHighResImg(i.img)}
							alt={i.item}
							class="h-full w-full object-contain transition-transform duration-300 [image-rendering:pixelated] group-hover:scale-110"
						/>
						{#if i.category}
							<div
								class="badge badge-outline bg-base-100/80 absolute top-4 right-4 backdrop-blur-md"
							>
								{i.category.title}
							</div>
						{/if}
					</figure>
					<div class="card-body p-5">
						<div class="mb-1 flex items-start justify-between">
							<h2 class="card-title text-xl leading-tight font-bold">{i.item}</h2>
						</div>

						<div class="mt-2 space-y-3">
							<!-- Team Ownership -->
							<div class="flex items-center gap-2">
								<span class="text-xs font-semibold tracking-wider uppercase opacity-60">Owner:</span
								>
								{#if i.team}
									<div class="flex items-center gap-1.5">
										<div
											class="h-3 w-3 rounded-full"
											style="background-color: {i.team.color || '#ccc'}"
										></div>
										<span class="font-medium">{i.team.name}</span>
									</div>
								{:else}
									<span class="text-sm italic opacity-50">Unowned</span>
								{/if}
							</div>

							<!-- Automated Status -->
							<div class="flex items-center gap-2">
								<span class="text-xs font-semibold tracking-wider uppercase opacity-60"
									>Status:</span
								>
								{#if i.automated}
									<span class="badge badge-info badge-sm font-semibold">Automated</span>
								{:else}
									<span class="text-sm italic opacity-50">Manual</span>
								{/if}
							</div>

							<!-- Variations -->
							{#if i.variations && Array.isArray(i.variations) && i.variations.length > 0}
								<div>
									<span class="mb-1 block text-xs font-semibold tracking-wider uppercase opacity-60"
										>Variations:</span
									>
									<div class="flex flex-wrap gap-1.5">
										{#each i.variations as variation}
											<span class="badge badge-sm badge-ghost">{variation}</span>
										{/each}
									</div>
								</div>
							{:else if i.variations && typeof i.variations === 'object'}
								<div>
									<span class="mb-1 block text-xs font-semibold tracking-wider uppercase opacity-60"
										>Variations:</span
									>
									<div class="flex flex-wrap gap-1.5">
										{#each Object.entries(i.variations) as [key, value]}
											<span class="badge badge-sm badge-secondary">{key}: {value}</span>
										{/each}
									</div>
								</div>
							{/if}
						</div>

						<div class="card-actions border-base-200 mt-4 justify-between border-t pt-4">
							<div class="flex flex-col">
								<span class="text-[10px] font-bold uppercase opacity-50">Weight</span>
								<span class="font-mono text-sm">{i.weight}kg</span>
							</div>
							<div class="flex flex-col text-right">
								<span class="text-[10px] font-bold uppercase opacity-50">Scale</span>
								<span class="font-mono text-sm">{i.scale}x</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Custom hover effects if needed, but Tailwind 4/5 utility classes are preferred */
	.card {
		transition: transform 0.2s ease-in-out;
	}
	.card:hover {
		transform: translateY(-4px);
	}
</style>
