<script lang="ts">
  import type { PreferencesState } from '$lib/singleton/wizard.svelte.ts';
  export let state: PreferencesState;

  let data = { ...state.data };
  $: state.data = { ...data };
</script>

<div class="flex items-center gap-2">
  <input type="checkbox" bind:checked={data.newsletter} id="newsletter" class="w-4 h-4" />
  <label for="newsletter">Subscribe to newsletter</label>
</div>
