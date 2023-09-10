<script>
	import 'iconify-icon'
	import '../app.postcss';
	import { AppBar, AppShell, Avatar, LightSwitch, initializeStores, getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import LoginWithGuilded from '$lib/client/fragments/login-with-guilded/login-with-guilded.svelte';
	
	initializeStores()
	
	const drawerStore = getDrawerStore();

</script>

<Drawer position="bottom">
	<div class="flex flex-col gap-4 mt-4 items-center w-full">
		{#if $page.data.user}
		<div class="flex flex-col items-center w-full">
			<a href="profile" on:click={() => drawerStore.close()}>
				<Avatar src={$page.data.user.avatar} width="w-16" rounded="rounded-full" />
			</a>
			{#if $page.data.hordeUser}
			<div class="flex justify-between items-center mt-4 w-1/2">
				<div class="flex flex-col">
					{$page.data.user.name}
					<small>
						{$page.data.hordeUser.username}
					</small>
				</div>
				<div class="flex flex-col">
					{$page.data.hordeUser.kudos}
					<small>
						kudos
					</small>
				</div>
			</div>
			{/if}
		</div>
		<hr class="w-2/3" />
		{/if}
		<a href="models" on:click={() => drawerStore.close()}>
			Models
		</a>
		{#if $page.data.user}
		<a href="settings" on:click={() => drawerStore.close()}>
			Account Settings
		</a>
		<hr class="w-2/3" />
		<form action="/logout" method="POST">
			<button class="btn variant-ghost-error mb-4" type="submit">
				Logout
			</button>
		</form>
		{:else}
		<hr class="w-2/3" />
			<LoginWithGuilded />
		{/if}
	</div>
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		{#if ($page.data.user && $page.data.user.hordeKey !== "0000000000" && !$page.data.hordeUser)}
			<div class="w-full p-4 bg-error-200 text-error-700 text-center">
				<p>
					Your Horde Token is Invalid, Default anonymous token will be used. Please update it in your account settings.
				</p>
			</div>
		{/if}
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/">
					<h1>
						Diffusion
					</h1>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				{#if $page.data.user}
				<div class="flex gap-4 items-center">
					<button on:click={() => drawerStore.open()}>
						<Avatar src={$page.data.user.avatar} width="w-10" rounded="rounded-full" />
					</button>
				</div>
				{:else}
				<button class="mt-1" on:click={() => drawerStore.open()}>
					<iconify-icon icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger" />
				</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="w-full flex justify-center my-4">
		<div class="container">
			<slot />
		</div>
	</div>
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		<div class="w-full flex justify-center text-center">
			The Diffusion Project is Powered by AI Horde
		</div>
	</svelte:fragment>
</AppShell>

