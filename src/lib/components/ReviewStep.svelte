<script lang="ts">
  import type { ReviewState } from '$lib/singleton/wizard.svelte.ts';
  export let state: ReviewState;
</script>

<div class="p-2 bg-gray-50 rounded border">
  <h3 class="font-semibold mb-2">Review your data:</h3>
  <pre>{JSON.stringify(state.data, null, 2)}</pre>
</div>
