<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	let editingItemId = $state<string | null>(null);

	function startEdit(id: string) {
		editingItemId = id;
	}

	function cancelEdit() {
		editingItemId = null;
	}
</script>

<div class="p-6">
	<h1 class="mb-6 text-2xl font-bold">Manage Items</h1>

	{#if form?.success}
		<p class="mb-4 text-green-500">Operation successful!</p>
	{/if}

	<div class="bg-base-200 mb-8 rounded-xl p-4">
		<h2 class="mb-4 text-xl font-semibold">Add Item</h2>
		<form method="POST" action="?/create" use:enhance class="flex flex-wrap items-end gap-4">
			<div class="form-control">
				<label class="label" for="new-item-name"><span class="label-text">Name</span></label>
				<input id="new-item-name" type="text" name="item" class="input input-bordered" required />
			</div>
			<div class="form-control">
				<label class="label" for="new-item-img"><span class="label-text">Image (URL)</span></label>
				<input
					id="new-item-img"
					type="text"
					name="img"
					class="input input-bordered"
					placeholder="icon.png"
				/>
			</div>
			<div class="form-control">
				<label class="label" for="new-item-scale"><span class="label-text">Scale</span></label>
				<input
					id="new-item-scale"
					type="number"
					name="scale"
					class="input input-bordered"
					value="1"
					required
				/>
			</div>
			<div class="form-control">
				<label class="label" for="new-item-weight"><span class="label-text">Weight</span></label>
				<input
					id="new-item-weight"
					type="number"
					name="weight"
					class="input input-bordered"
					value="1"
					required
				/>
			</div>
			<div class="form-control">
				<label class="label" for="new-item-category"><span class="label-text">Category</span></label
				>
				<select id="new-item-category" name="categoryId" class="select select-bordered">
					<option value="">None</option>
					{#each data.categories as cat}
						<option value={cat.id}>{cat.title}</option>
					{/each}
				</select>
			</div>
			<div class="form-control">
				<label class="label" for="new-item-team"><span class="label-text">Team</span></label>
				<select id="new-item-team" name="teamId" class="select select-bordered">
					<option value="">None</option>
					{#each data.teams as t}
						<option value={t.id}>{t.name}</option>
					{/each}
				</select>
			</div>
			<div class="form-control">
				<label class="label cursor-pointer gap-2">
					<span class="label-text">Automated</span>
					<input type="checkbox" name="automated" class="checkbox" />
				</label>
			</div>
			<button type="submit" class="btn btn-primary">Add Item</button>
		</form>
	</div>

	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Item</th>
					<th>Scale</th>
					<th>Weight</th>
					<th>Category</th>
					<th>Team</th>
					<th>Automated</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.items as i}
					<tr>
						{#if editingItemId === i.id}
							<td colspan="7">
								<form
									method="POST"
									action="?/update"
									use:enhance={() => {
										return async ({ result }) => {
											if (result.type === 'success') {
												editingItemId = null;
											}
										};
									}}
									class="bg-base-200 flex flex-wrap items-end gap-4 rounded-lg p-4"
								>
									<input type="hidden" name="id" value={i.id} />
									<input type="hidden" name="img" value={i.img} />
									<input type="hidden" name="amounts" value={i.amounts} />
									<div class="form-control">
										<label class="label" for="edit-name-{i.id}"
											><span class="label-text">Name</span></label
										>
										<input
											id="edit-name-{i.id}"
											type="text"
											name="item"
											value={i.item}
											class="input input-bordered input-sm"
											required
										/>
									</div>
									<div class="form-control">
										<label class="label" for="edit-scale-{i.id}"
											><span class="label-text">Scale</span></label
										>
										<input
											id="edit-scale-{i.id}"
											type="number"
											name="scale"
											value={i.scale}
											class="input input-bordered input-sm"
											required
										/>
									</div>
									<div class="form-control">
										<label class="label" for="edit-weight-{i.id}"
											><span class="label-text">Weight</span></label
										>
										<input
											id="edit-weight-{i.id}"
											type="number"
											name="weight"
											value={i.weight}
											class="input input-bordered input-sm"
											required
										/>
									</div>
									<div class="form-control">
										<label class="label" for="edit-category-{i.id}"
											><span class="label-text">Category</span></label
										>
										<select
											id="edit-category-{i.id}"
											name="categoryId"
											class="select select-bordered select-sm"
										>
											<option value="">None</option>
											{#each data.categories as cat}
												<option value={cat.id} selected={i.categoryId === cat.id}
													>{cat.title}</option
												>
											{/each}
										</select>
									</div>
									<div class="form-control">
										<label class="label" for="edit-team-{i.id}"
											><span class="label-text">Team</span></label
										>
										<select
											id="edit-team-{i.id}"
											name="teamId"
											class="select select-bordered select-sm"
										>
											<option value="">None</option>
											{#each data.teams as t}
												<option value={t.id} selected={i.teamId === t.id}>{t.name}</option>
											{/each}
										</select>
									</div>
									<div class="form-control">
										<label class="label cursor-pointer gap-2">
											<span class="label-text">Automated</span>
											<input
												type="checkbox"
												name="automated"
												class="checkbox checkbox-sm"
												checked={i.automated}
											/>
										</label>
									</div>
									<div class="flex gap-2">
										<button type="submit" class="btn btn-primary btn-sm">Save</button>
										<button type="button" onclick={cancelEdit} class="btn btn-ghost btn-sm"
											>Cancel</button
										>
									</div>
								</form>
							</td>
						{:else}
							<td>
								<div class="flex items-center gap-2">
									<img src={i.img} alt={i.item} class="h-8 w-8 object-contain" />
									{i.item}
								</div>
							</td>
							<td>{i.scale}</td>
							<td>{i.weight}</td>
							<td>{i.category?.title || 'None'}</td>
							<td>{i.team?.name || 'None'}</td>
							<td>
								{#if i.automated}
									<span class="badge badge-info">Yes</span>
								{:else}
									<span class="badge badge-ghost">No</span>
								{/if}
							</td>
							<td class="flex gap-2">
								<button class="btn btn-ghost btn-xs" onclick={() => startEdit(i.id)}>Edit</button>
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="id" value={i.id} />
									<button type="submit" class="btn btn-error btn-xs">Delete</button>
								</form>
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
