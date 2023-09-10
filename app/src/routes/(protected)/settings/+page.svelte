<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  export let form;
</script>
<h1>
  Settings
</h1>

<form class="flex flex-col gap-4 items-center m-4 text-center" action="?/updateSettings" method="post" use:enhance>
  {#if form?.invalid}
    <p class="text-error-500">Invalid Token</p>
  {/if}
  {#if form?.success}
    <p>Successfully logged in! Welcome to Guilded Diffusion, 
      <span class="text-success-900 dark:text-success-500">
        {form?.data.username}
      </span>
    </p>
  {/if}
  <input class={`p-2`} placeholder="Horde Token" type="text" name="hordeToken" value={$page.data.user.hordeKey !== "0000000000" ? $page.data.user.hordeKey: ""} />
  <button class="btn variant-ghost" type="submit">
    Update
  </button>
</form>