<script lang="ts">
  import { wizard } from '$lib';

  import UserInfoStep from './UserInfoStep.svelte';
  import PreferencesStep from './PreferencesStep.svelte';
  import ReviewStep from './ReviewStep.svelte';

  // Map state constructors to components
  const stepComponents = new Map();
  stepComponents.set('UserInfoState', UserInfoStep);
  stepComponents.set('PreferencesState', PreferencesStep);
  stepComponents.set('ReviewState', ReviewStep);

  $inspect(wizard.currentState);
  let CurrentComponent = $derived(stepComponents.get(wizard.currentState?.constructor.name));
</script>

<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
  {#if CurrentComponent}
   <div class="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
      <CurrentComponent state={wizard.currentState} />

      <div class="flex justify-between w-full mt-6">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          onclick={() => wizard.prev()}
        >
          Prev
        </button>

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onclick={() => wizard.next()}
        >
          Next
        </button>
      </div>
    </div>
  {/if}
</div>


