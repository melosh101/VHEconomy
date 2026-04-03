<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	let editingRoleId = $state<string | null>(null);

	function startEdit(id: string) {
		editingRoleId = id;
	}

	function cancelEdit() {
		editingRoleId = null;
	}
</script>

<div class="p-6">
	<h1 class="mb-6 text-2xl font-bold">Manage Roles</h1>

	{#if form?.success}
		<p class="mb-4 text-green-500">Operation successful!</p>
	{/if}

	<div class="bg-base-200 mb-8 rounded-xl p-4">
		<h2 class="mb-4 text-xl font-semibold">Add Role</h2>
		<form method="POST" action="?/create" use:enhance class="flex flex-wrap items-end gap-4">
			<div class="form-control">
				<label class="label"><span class="label-text">Name</span></label>
				<input type="text" name="name" class="input input-bordered" required />
			</div>
			<div class="form-control">
				<label class="label"><span class="label-text">Color (Hex)</span></label>
				<input type="text" name="color" class="input input-bordered" placeholder="#ffffff" />
			</div>
			<button type="submit" class="btn btn-primary">Add Role</button>
		</form>
	</div>

	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Color</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.roles as r}
					<tr>
						{#if editingRoleId === r.id}
							<td colspan="3">
								<form
									method="POST"
									action="?/update"
									use:enhance={() => {
										return async ({ result }) => {
											if (result.type === 'success') {
												editingRoleId = null;
											}
										};
									}}
									class="bg-base-200 flex flex-wrap items-end gap-4 rounded-lg p-4"
								>
									<input type="hidden" name="id" value={r.id} />
									<div class="form-control">
										<label class="label"><span class="label-text">Name</span></label>
										<input
											type="text"
											name="name"
											value={r.name}
											class="input input-bordered input-sm"
											required
										/>
									</div>
									<div class="form-control">
										<label class="label"><span class="label-text">Color</span></label>
										<input
											type="text"
											name="color"
											value={r.color || ''}
											class="input input-bordered input-sm"
										/>
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
							<td>{r.name}</td>
							<td>
								<div class="flex items-center gap-2">
									<div class="h-4 w-4 rounded" style="background-color: {r.color || '#ccc'}"></div>
									{r.color || 'None'}
								</div>
							</td>
							<td class="flex gap-2">
								<button class="btn btn-ghost btn-xs" onclick={() => startEdit(r.id)}>Edit</button>
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="id" value={r.id} />
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
