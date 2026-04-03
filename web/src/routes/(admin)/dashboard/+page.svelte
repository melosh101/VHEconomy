<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<div class="p-8">
	<h1 class="text-primary mb-8 text-3xl font-bold">Dashboard Overview</h1>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<a
			href="/dashboard/users"
			class="card bg-base-200 hover:bg-base-300 shadow-xl transition-colors"
		>
			<div class="card-body">
				<h2 class="card-title text-secondary">Users</h2>
				<p>Manage permissions, IGNs, and team assignments.</p>
			</div>
		</a>

		<a
			href="/dashboard/teams"
			class="card bg-base-200 hover:bg-base-300 shadow-xl transition-colors"
		>
			<div class="card-body">
				<h2 class="card-title text-secondary">Teams</h2>
				<p>Create and edit teams and their branding.</p>
			</div>
		</a>

		<a
			href="/dashboard/items"
			class="card bg-base-200 hover:bg-base-300 shadow-xl transition-colors"
		>
			<div class="card-body">
				<h2 class="card-title text-secondary">Items</h2>
				<p>Catalog management, weights, and categories.</p>
			</div>
		</a>

		<a
			href="/dashboard/roles"
			class="card bg-base-200 hover:bg-base-300 shadow-xl transition-colors"
		>
			<div class="card-body">
				<h2 class="card-title text-secondary">Roles</h2>
				<p>Define custom roles for user classification.</p>
			</div>
		</a>
	</div>

	<div class="bg-info/10 border-info/20 mt-12 rounded-2xl border p-6">
		<h2 class="mb-2 text-xl font-semibold">Welcome, {data.user?.name}!</h2>
		<p class="text-base-content/70">
			You are currently in the administrative management area. Select a category above or from the
			sidebar to begin editing.
		</p>
	</div>
</div>
