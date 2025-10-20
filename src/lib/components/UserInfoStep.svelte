<script lang="ts">
  import type { UserInfoState } from '$lib/singleton/wizard.svelte.ts';
  export let state: UserInfoState;
</script>

<div class="flex flex-col gap-2">
  <label for="name">Name:</label>
  <input id="name" type="text" bind:value={state.data.name} placeholder="Name" class="border p-2 rounded" />

  <label for="email">Email:</label>
  <input id="email" type="email" bind:value={state.data.email} placeholder="Email" class="border p-2 rounded" />
</div>
