<script lang="ts">
  import {HordeClient, type GenerationInputStable} from '$lib/common'
  import { page } from '$app/stores';
  import {PUBLIC_HORDE_CLIENT_NAME, PUBLIC_HORDE_CLIENT_VERSION, PUBLIC_HORDE_CLIENT_CONTACT} from '$env/static/public'
	import { onMount } from 'svelte';
	import { InputChip, RangeSlider } from '@skeletonlabs/skeleton';
  
  const hordeClient = new HordeClient(
    PUBLIC_HORDE_CLIENT_NAME,
    PUBLIC_HORDE_CLIENT_VERSION,
    PUBLIC_HORDE_CLIENT_CONTACT
  )
  const token = $page.data.user.hordeKey || "0000000000"

  let prompt = ""
  let negativePrompt = ""
  let models: string[]

  let genReq: GenerationInputStable = {
    prompt: "",
    models: [],
    nsfw: false,
    trusted_workers: false,
    slow_workers: true,
    censor_nsfw: true,
    workers: [],
    worker_blacklist: false,
    source_image: "",
    source_processing: "img2img",
    source_mask: "",
    r2: true,
    shared: true,
    replacement_filter: false,
    dry_run: false,
    params: {
      sampler_name: "k_euler_a",
      cfg_scale: 7.5,
      denoising_strength: 0.75,
      seed: "",
      height: 512,
      width: 512,
      seed_variation: 1,
      post_processing: [],
      karras: false,
      tiling: false,
      hires_fix: false,
      clip_skip: 1,
      // control_type: "normal",
      // image_is_control: false,
      // return_control_map: false,
      facefixer_strength: 0.5,
      loras: [],
      tis: [],
      special: {},
      steps: 30,
      n: 1
    }
  }

  let activeImages: string[]

  function handleSelect(event: Event) {
    console.log(event)
    const maxSelections = 5;
    const selectElement = event.target as HTMLSelectElement;
    const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value);
    console.log(selectedValues, selectedValues.slice(1))
    if (selectedValues.length > maxSelections) {
      
      const clampedValues = selectedValues.slice(1,6);
      genReq.models = clampedValues;
      Array.from(selectElement.options).forEach((option) => {
        if (clampedValues.includes(option.value)) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      })
    } 
  }
  
  async function updateImages (images: string[]) {
    activeImages = images
  }
  async function submitReq() {
    genReq.prompt = `${prompt} ${negativePrompt !== "" ? ` ### ${negativePrompt}` : ""}`
    if (!genReq.params) {
      genReq.params = {}
    }
    console.log("ran on token", token, prompt)
    const res = await hordeClient.asyncImageGen(token, genReq, (e) => {
      console.log(e)
    },  (e) => {
      console.log(e)
      e.generations.forEach((gen) => {
        updateImages([...activeImages, gen.img])
      })
    }, (e) => {
      console.log(e)
    }, (e) => {
      console.log(e)
    })
    console.log(res)
  }
  
  $:activeImages = []
  $:models = []
  onMount(async () => {
    models = (await hordeClient.getModels('image')).map((model) => model.name)
  })
</script>

<form class="flex flex-col gap-2" method="post" on:submit|preventDefault={submitReq}>
  {#each activeImages as image}
    <img src={image} alt="generated" class="rounded-lg" loading="lazy" />
  {/each}
  <label for="models">
    Models
    <!-- {#key models} -->
    <select class="select" multiple bind:value={genReq.models} on:change={handleSelect}>
      {#each models as model}
        <option value={model}>{model}</option>
      {/each}
    </select>
    <!-- {/key} -->
    <!-- <InputChip name="models" whitelist={models} max={5} allowUpperCase /> -->
  </label>
  <label for="prompt">
    Prompt
    <input name="prompt" class="p-2 rounded-lg" type="text" bind:value={prompt} placeholder="A cat and dog playing chess" />
  </label>
  <label for="negative-prompt">
    Negative Prompt
    <input name="negative-prompt" class="p-2 rounded-lg" type="text" bind:value={negativePrompt} placeholder="sketch, sign, blurry...">
  </label>
  {#if genReq.params}
  <label for="clip-skip">
    <RangeSlider name="clip-skip" bind:value={genReq.params.clip_skip} min={1} max={10} ticked>
      <div class="flex justify-between items-center">
        <div>CLIP Skip</div>
        <div class="text-xs">{genReq.params.clip_skip} / 10</div>
      </div>
    </RangeSlider>
  </label>
  <label for="face-fixer">
    <RangeSlider name="face-fixer" bind:value={genReq.params.facefixer_strength} min={0} step={0.1} max={1} ticked>
      <div class="flex justify-between items-center">
        <div>Face Fixer Strength</div>
        <div class="text-xs">{genReq.params.facefixer_strength} / 1</div>
      </div>
    </RangeSlider>
  </label>
  <label for="steps">
    <RangeSlider name="steps" bind:value={genReq.params.steps} min={1} max={500}>
      <div class="flex justify-between items-center">
        <div>Steps</div>
        <div class="text-xs">{genReq.params.steps} / 500</div>
      </div>
    </RangeSlider>
  </label>
  <label for="number-of-images">
    <RangeSlider name="number-of-images" bind:value={genReq.params.n} min={1} max={20} ticked>
      <div class="flex justify-between items-center">
        <div>Number of images</div>
        <div class="text-xs">{genReq.params.n} / 20</div>
      </div>
    </RangeSlider>
  </label>
  {/if}
  <button class="btn variant-ghost" type="submit">Prompt</button>
</form>

