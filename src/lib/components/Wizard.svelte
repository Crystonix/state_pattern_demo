<script lang="ts">
  import { wizard } from '$lib';

  import UserInfoStep from './UserInfoStep.svelte';
  import PreferencesStep from './PreferencesStep.svelte';
  import ReviewStep from './ReviewStep.svelte';

  // Map state constructors to components
  const stepComponents = new Map();
  stepComponents.set(wizard.userInfoState.constructor, UserInfoStep);
  stepComponents.set(wizard.preferencesState.constructor, PreferencesStep);
  stepComponents.set(wizard.reviewState.constructor, ReviewStep);

  $inspect(wizard.currentState);
  let CurrentComponent = $derived(stepComponents.get(wizard.currentState?.constructor));
</script>

{#if CurrentComponent}
  <CurrentComponent state={wizard} />
{/if}

<button onclick={() => wizard.prev()}>Prev</button>
<button onclick={() => wizard.next()}>Next</button>
