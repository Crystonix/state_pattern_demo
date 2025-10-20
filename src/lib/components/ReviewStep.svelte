<script lang="ts">
  import { ReviewState } from '$lib/singleton/wizard.svelte.ts';
  import { wizard } from '$lib';
  let {state}: {state: ReviewState} = $props();
  let allData = $derived(wizard.getAllData());
</script>

<div class="p-2 bg-gray-50 rounded border">
  <h3 class="font-semibold mb-2">Review your data:</h3>
  <pre>{JSON.stringify(allData, null, 2)}</pre>
</div>
