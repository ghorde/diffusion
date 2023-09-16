<script lang="ts">
  import {HordeClient, type GenerationInputStable, type PostProcessors} from '$lib/common'
  import { page } from '$app/stores';
  import {PUBLIC_HORDE_CLIENT_NAME, PUBLIC_HORDE_CLIENT_VERSION, PUBLIC_HORDE_CLIENT_CONTACT} from '$env/static/public'
	import { onMount } from 'svelte';
	import { SlideToggle, RangeSlider } from '@skeletonlabs/skeleton';
  
  const hordeClient = new HordeClient(
    PUBLIC_HORDE_CLIENT_NAME,
    PUBLIC_HORDE_CLIENT_VERSION,
    PUBLIC_HORDE_CLIENT_CONTACT
  )
  const token = $page.data.user.hordeKey || "0000000000"
  const samplers = ["k_lms", "k_heun", "k_euler" , "k_euler_a" ,"k_dpm_2" , "k_dpm_2_a" , "k_dpm_fast" , "k_dpm_adaptive" , "k_dpmpp_2s_a" , "k_dpmpp_2m" , "dpmsolver" , "k_dpmpp_sde" , "DDIM"] 
  const postProcessors = ["GFPGAN", "RealESRGAN_x4plus", "RealESRGAN_x2plus", "RealESRGAN_x4plus_anime_6B", "NMKD_Siax", "4x_AnimeSharp", "CodeFormers", "strip_background"]

  let prompt = ""
  let negativePrompt = ""
  let models: string[]

  let genReq: GenerationInputStable = {
    prompt: "",
    models: ["stable_diffusion"],
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
      post_processing: ["GFPGAN"],
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

  
  let commonDomModels = JSON.parse(JSON.stringify(genReq.models))
  function updateModels(event: Event) {
    // get list of selected values
    const selectElement = event.target as HTMLSelectElement;
    for (var option of selectElement.options) {
      var value = option.value as PostProcessors;
      if (option.selected) {
        if (genReq.models && genReq.models.indexOf(value) < 0) {
          genReq.models.push(value)
        }
      } else {
        if (genReq.models && genReq.models.indexOf(value) >= 0) {
          genReq.models.splice(genReq.models.indexOf(value), 1)
        }
      }
    }
    if (genReq.models && genReq.models.length > 5) {
      genReq.models.shift()
    }
    commonDomModels = JSON.parse(JSON.stringify(genReq.models))
    console.log(genReq.models)
  }

  let commonDomPostProcessors = JSON.parse(JSON.stringify(genReq.params?.post_processing))
  function updatePostProcessors(event: Event) {
    // get list of selected values
    const selectElement = event.target as HTMLSelectElement;
    for (var option of selectElement.options) {
      var value = option.value as PostProcessors;
      if (option.selected) {
        if (genReq.params && genReq.params.post_processing && genReq.params.post_processing.indexOf(value) < 0) {
          genReq.params.post_processing.push(value)
        }
      } else {
        if (genReq.params && genReq.params.post_processing && genReq.params.post_processing.indexOf(value) >= 0) {
          genReq.params.post_processing.splice(genReq.params.post_processing.indexOf(value), 1)
        }
      }
    }
    commonDomPostProcessors = JSON.parse(JSON.stringify(genReq.params?.post_processing))
    console.log(genReq.params?.post_processing)
  }  

  async function updateImages (images: string[]) {
    activeImages = images
  }
  async function submitReq() {
    genReq.prompt = `${prompt} ${negativePrompt !== "" ? ` ### ${negativePrompt}` : ""}`
    if (!genReq.params) {
      genReq.params = {}
    }
    console.log("ran on token", token, genReq)
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
    Models (Upto 5)
    <select class="select" bind:value={commonDomModels} multiple on:change={updateModels}>
      {#each models as model}
        <option value={model}>{model}</option>
      {/each}
    </select>
  </label>
  <label for="prompt">
    Prompt
    <input name="prompt" class="p-2 rounded-lg" type="text" bind:value={prompt} placeholder="Example: A cat and dog playing chess" />
  </label>
  <label for="negative-prompt">
    Negative Prompt
    <input name="negative-prompt" class="p-2 rounded-lg" type="text" bind:value={negativePrompt} placeholder="sketch, sign, blurry...">
  </label>
  <div class="flex flex-wrap gap-4">
    <label for="nsfw">
      <div class="flex flex-col gap-2">
        NSFW
        <SlideToggle name="nsfw" bind:checked={genReq.nsfw} required />
      </div>
    </label>
    <label for="trusted_workers">
      <div class="flex flex-col gap-2">
        Trusted Workers
        <SlideToggle name="trusted_workers" bind:checked={genReq.trusted_workers} required />
      </div>
    </label>
    <label for="slow_workers">
      <div class="flex flex-col gap-2">
        Slow Workers
        <SlideToggle name="slow_workers" bind:checked={genReq.slow_workers} required />
      </div>
    </label>
    <label for="censor_nsfw">
      <div class="flex flex-col gap-2">
        Censor NSFW
        <SlideToggle name="censor_nsfw" bind:checked={genReq.censor_nsfw} required />
      </div>
    </label>
    <label for="shared">
      <div class="flex flex-col gap-2">
        Shared
        <SlideToggle name="shared" bind:checked={genReq.shared} required />
      </div>
    </label>
    {#if genReq.params}
      <label for="karras">
        <div class="flex flex-col gap-2">
          Karras
          <SlideToggle name="karras" bind:checked={genReq.params.karras} required />
        </div>
      </label>
      <label for="tiling">
        <div class="flex flex-col gap-2">
          Tiling
          <SlideToggle name="karras" bind:checked={genReq.params.tiling} required />
        </div>
      </label>
      <label for="hires_fix">
        <div class="flex flex-col gap-2">
          Hi-Res Fix
          <SlideToggle name="hires_fix" bind:checked={genReq.params.hires_fix} required />
        </div>
      </label>
    {/if}
  </div>
  {#if genReq.params}
  <label for="samplers">
    Sampler
    <select class="select" bind:value={genReq.params.sampler_name}>
      {#each samplers as sampler}
        <option value={sampler}>{sampler}</option>
      {/each}
    </select>
  </label>
  <label for="cfg_scale">
    <RangeSlider name="cfg_scale" bind:value={genReq.params.cfg_scale} min={0} max={10} ticked>
      <div class="flex justify-between items-center">
        <div>CFG Scale</div>
        <div class="text-xs">{genReq.params.cfg_scale} / 10</div>
      </div>
    </RangeSlider>
  </label>
  <label for="denoising_strength">
    <RangeSlider name="denoising_strength" bind:value={genReq.params.denoising_strength} min={0.01} max={1} step={0.01} ticked>
      <div class="flex justify-between items-center">
        <div>Denoising Strength</div>
        <div class="text-xs">{genReq.params.denoising_strength} / 1</div>
      </div>
    </RangeSlider>
  </label>
  <label for="seed">
    Seed
    <input name="seed" class="p-2 rounded-lg" type="text" bind:value={genReq.params.seed} placeholder="Over the sunrise" />
  </label>
  <label for="height">
    <RangeSlider name="height" bind:value={genReq.params.height} min={64} max={$page.data.user ? 3072 : 768} step={64} ticked>
      <div class="flex justify-between items-center">
        <div>Height</div>
        <div class="text-xs">{genReq.params.height} / {$page.data.user ? 3072 : 768}</div>
      </div>
    </RangeSlider>
  </label>
  <label for="width">
    <RangeSlider name="width" bind:value={genReq.params.width} min={64} max={$page.data.user ? 3072 : 768} step={64} ticked>
      <div class="flex justify-between items-center">
        <div>Width</div>
        <div class="text-xs">{genReq.params.width} / {$page.data.user ? 3072 : 768}</div>
      </div>
    </RangeSlider>
  </label>
  <label for="seed_variation">
    <RangeSlider name="seed_variation" bind:value={genReq.params.seed_variation} min={1} max={1000} step={1}>
      <div class="flex justify-between items-center">
        <div>Seed Variation</div>
        <div class="text-xs">{genReq.params.seed_variation} / 1000</div>
      </div>
    </RangeSlider>
  </label>
  <label for="post_processing">
    Post Processors (Unique, in order)
    <select class="select" bind:value={commonDomPostProcessors} multiple on:change={updatePostProcessors}>
      {#each postProcessors as postProcessor}
        <option value={postProcessor}>{postProcessor}</option>
      {/each}
    </select>
  </label>
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

