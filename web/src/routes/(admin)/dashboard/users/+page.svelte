<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	let editingUserId = $state<string | null>(null);

	function startEdit(id: string) {
		editingUserId = id;
	}

	function cancelEdit() {
		editingUserId = null;
	}
</script>

<div class="p-6">
	<h1 class="mb-6 text-2xl font-bold">Manage Users</h1>

	{#if form?.success}
		<p class="mb-4 text-green-500">Operation successful!</p>
	{/if}
	{#if form?.message}
		<p class="mb-4 text-red-500">{form.message}</p>
	{/if}

	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>IGN</th>
					<th>Email</th>
					<th>Team</th>
					<th>Role</th>
					<th>Admin</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.users as u}
					<tr>
						{#if editingUserId === u.id}
							<td colspan="7">
								<form
									method="POST"
									action="?/update"
									use:enhance={() => {
										return async ({ result }) => {
											if (result.type === 'success') {
												editingUserId = null;
											}
										};
									}}
									class="bg-base-200 flex flex-wrap items-end gap-4 rounded-lg p-4"
								>
									<input type="hidden" name="id" value={u.id} />
									<div class="form-control">
										<label class="label"><span class="label-text">Name</span></label>
										<input
											type="text"
											name="name"
											value={u.name}
											class="input input-bordered input-sm"
											required
										/>
									</div>
									<div class="form-control">
										<label class="label"><span class="label-text">IGN</span></label>
										<input
											type="text"
											name="ign"
											value={u.ign || ''}
											class="input input-bordered input-sm"
										/>
									</div>
									<div class="form-control">
										<label class="label"><span class="label-text">Team</span></label>
										<select name="teamId" class="select select-bordered select-sm">
											<option value="">None</option>
											{#each data.teams as t}
												<option value={t.id} selected={u.teamId === t.id}>{t.name}</option>
											{/each}
										</select>
									</div>
									<div class="form-control">
										<label class="label"><span class="label-text">Role</span></label>
										<select name="roleId" class="select select-bordered select-sm">
											<option value="">None</option>
											{#each data.roles as r}
												<option value={r.id} selected={u.roleId === r.id}>{r.name}</option>
											{/each}
										</select>
									</div>
									<div class="form-control">
										<label class="label flex cursor-pointer gap-2">
											<span class="label-text">Admin</span>
											<input
												type="checkbox"
												name="isAdmin"
												checked={u.isAdmin}
												class="checkbox checkbox-sm"
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
							<td>{u.name}</td>
							<td>{u.ign || '-'}</td>
							<td>{u.email}</td>
							<td>{u.team?.name || 'None'}</td>
							<td>{u.role?.name || 'None'}</td>
							<td>{u.isAdmin ? '✅' : '❌'}</td>
							<td class="flex gap-2">
								<button class="btn btn-ghost btn-xs" onclick={() => startEdit(u.id)}>Edit</button>
								<form method="POST" action="?/delete" use:enhance>
									<input type="hidden" name="id" value={u.id} />
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
