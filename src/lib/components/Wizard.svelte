<script lang="ts">
  import { wizard } from '$lib';

  import UserInfoStep from './UserInfoStep.svelte';
  import PreferencesStep from './PreferencesStep.svelte';
  import ReviewStep from './ReviewStep.svelte';
  import NewsletterStep from './NewsletterStep.svelte';

  // Map state constructors to components
  const stepComponents = new Map();
  stepComponents.set('UserInfoState', UserInfoStep);
  stepComponents.set('PreferencesState', PreferencesStep);
  stepComponents.set('NewsletterState', NewsletterStep);
  stepComponents.set('ReviewState', ReviewStep);

  $inspect(wizard.currentState);
  let CurrentComponent = $derived(stepComponents.get(wizard.currentState?.constructor.name));
  $inspect(CurrentComponent);
</script>

<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
  <!--{#if CurrentComponent} -->
   <div class="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
      <CurrentComponent state={wizard.currentState} />
      <div class="flex justify-between w-full mt-6">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onclick={() => wizard.currentState.prev()}
          disabled={wizard.isFirstStep}
        >
          Prev
        </button>

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onclick={() => wizard.currentState.next()}
          disabled={wizard.isLastStep}
        >
          Next
        </button>
      </div>
    </div>
  <!-- {:else}
    <p>Loading...</p>
  {/if} -->
</div>


