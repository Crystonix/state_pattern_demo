<script lang="ts">
  import type { PreferencesState } from '$lib/singleton/wizard.svelte.ts';
  export let state: PreferencesState;
</script>

<div class="flex flex-col gap-4">
  <!-- Theme selection -->
  <div class="flex flex-col">
    <label for="theme" class="font-medium mb-1">Theme:</label>
    <select
      id="theme"
      bind:value={state.data.theme}
      class="border rounded p-2"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>

  <!-- Notifications toggle -->
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      bind:checked={state.data.notifications}
      id="notifications"
      class="w-4 h-4"
    />
    <label for="notifications">Enable notifications</label>
  </div>

  <!-- Newsletter toggle -->
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      bind:checked={state.data.newsletter}
      id="newsletter"
      class="w-4 h-4"
    />
    <label for="newsletter">Subscribe to newsletter</label>
  </div>
</div>
