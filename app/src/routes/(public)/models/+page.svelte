<script lang="ts">
	import type { ExtendedModel } from '$lib';
	import type { type } from 'os';
	import { onMount } from 'svelte';

  export let data;
  const {lazy} = data

</script>

<div class="columns-1 md:columns-3 lg:columns-4 gap-3 w-full mx-auto space-y-3 pb-28">
  {#await lazy.models}
    <p>Loading models...</p>
  {:then models}
  {#await lazy.extendedModels}
  <p>Loading extended models...</p>
  {:then extraData}
    {#each models as model}
      {#if extraData[model.name]}
        <div class="card card-hover bg-initial overflow-hidden break-inside-avoid">
          {#if extraData[model.name].showcases}
            <header>
              <img src={extraData[model.name].showcases[0]} alt="Model Showcase" class="bg-black/50" loading="lazy">
            </header>
          {/if}
            <div class="flex flex-col gap-4 p-4">
              <h5 class="capitalize">
                {model.type} model
              </h5>
              <h3 class="h-auto max-w-full">
                {model.name}
              </h3>
              <div class="flex justify-between">
                <div class="flex flex-col gap-2">
                  <h6>
                    Performance
                  </h6>
                  <small>
                    {model.performance}
                  </small>
                  <h6>Queued</h6>
                  <small>
                    {model.queued}
                  </small>
                </div>
                <div class="flex flex-col gap-2">
                  <h6>
                    ETA
                  </h6>
                  <small>
                    {model.eta}
                  </small>
                  <h6>Count</h6>
                  <small>
                    {model.count}
                  </small>
                </div>
              </div>
              {#if extraData[model.name].tags}
              <div class="flex gap-2 flex-wrap">
                {#each extraData[model.name].tags as tag}
                  <div class="chip variant-filled">
                    {tag}
                  </div>
                {/each}
              </div>
              {/if}
              {#if extraData[model.name].description}
              <div class="flex flex-col gap-2">
                <h6>Description</h6>
                <p>{extraData[model.name].description}</p>
              </div>
              {/if}
            </div>
            <hr class="w-full" />
            <footer class="p-4 flex justify-start items-center space-x-4">
              {#if extraData[model.name].homepage}
                <div class="flex flex-col gap-2">
                  <h6>Homepage</h6>
                  <a href={extraData[model.name].homepage} target="_blank" rel="noopener noreferrer">
                    <p>{extraData[model.name].homepage}</p>
                  </a>
                </div>
              {/if}
            </footer>
        </div>
        {:else}
        <div class="card card-hover bg-initial overflow-hidden p-4 break-before-avoid">
          <h5 class="capitalize">
            {model.type} model
          </h5>
          <h3 class="h-auto max-w-full">
            {model.name}
          </h3>
          <div class="flex justify-between mt-4">
            <div class="flex flex-col gap-2">
              <h6>
                Performance
              </h6>
              <small>
                {model.performance}
              </small>
              <h6>Queued</h6>
              <small>
                {model.queued}
              </small>
            </div>
            <div class="flex flex-col gap-2">
              <h6>
                ETA
              </h6>
              <small>
                {model.eta}
              </small>
              <h6>Count</h6>
              <small>
                {model.count}
              </small>
            </div>
          </div>
          <hr class="w-full" />
          <footer class="p-4 flex justify-start items-center space-x-4">
          </footer>
        </div>
      {/if}
    {/each}
    {:catch}
      <p class="text-error-500">Failed to load extended models</p>
      {#each models as model}
      <div class="card card-hover bg-initial overflow-hidden p-4 break-before-avoid">
        <h5 class="capitalize">
          {model.type} model
        </h5>
        <h3 class="h-auto max-w-full">
          {model.name}
        </h3>
        <div class="flex justify-between mt-4">
          <div class="flex flex-col gap-2">
            <h6>
              Performance
            </h6>
            <small>
              {model.performance}
            </small>
            <h6>Queued</h6>
            <small>
              {model.queued}
            </small>
          </div>
          <div class="flex flex-col gap-2">
            <h6>
              ETA
            </h6>
            <small>
              {model.eta}
            </small>
            <h6>Count</h6>
            <small>
              {model.count}
            </small>
          </div>
        </div>
        <hr class="w-full" />
        <footer class="p-4 flex justify-start items-center space-x-4">
        </footer>
      </div>
      {/each}
    {/await}
  {:catch}
    <p>Failed to load models</p>
  {/await}
</div>