<script lang="ts">
  import type { NewsletterState } from '$lib/singleton/wizard.svelte.ts';
  export let state: NewsletterState;
</script>

<div class="flex flex-col gap-4">
  <!-- Newsletter frequency selection -->
  <div class="flex flex-col">
    <label for="frequency" class="font-medium mb-1">Newsletter Frequency:</label>
    <select
      id="frequency"
      bind:value={state.data.frequency}
      class="border rounded p-2"
    >
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  </div>

  <!-- Optional description or info -->
  <p class="text-sm text-gray-600">
    Select how often you want to receive the newsletter.
  </p>
</div>
