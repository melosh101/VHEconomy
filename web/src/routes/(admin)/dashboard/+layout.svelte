<script>
	let { children } = $props();
</script>

<div class="bg-base-100 flex min-h-screen">
	<aside class="bg-base-200 flex w-64 flex-col gap-4 p-6">
		<div>
			<a href="/"> {'<'}--- go back</a>
			<h2 class="mb-4 text-xl font-bold">Admin</h2>
		</div>
		<nav class="flex flex-col gap-2">
			<a href="/dashboard" class="btn btn-ghost justify-start">Overview</a>
			<a href="/dashboard/users" class="btn btn-ghost justify-start">Users</a>
			<a href="/dashboard/teams" class="btn btn-ghost justify-start">Teams</a>
			<a href="/dashboard/items" class="btn btn-ghost justify-start">Items</a>
			<a href="/dashboard/roles" class="btn btn-ghost justify-start">Roles</a>
		</nav>
		<div class="mt-auto">
			<a href="/" class="btn btn-outline btn-block">Back to Site</a>
		</div>
	</aside>
	<main class="flex-1 overflow-auto">
		{@render children()}
	</main>
</div>
