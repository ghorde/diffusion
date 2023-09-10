/**
 * Represents the record of generated or requested content by a user.
 *
 * @interface
 */
export interface UserAmountRecords {
  /**
   * The number of images this user has generated or requested.
   *
   * @default 0
   * @type {number}
   */
  image: number;

  /**
   * The number of text outputs this user has generated or requested.
   *
   * @default 0
   * @type {number}
   */
  text: number;

  /**
   * The number of videos this user has generated or requested.
   *
   * @default 0
   * @type {number}
   */
  interrogation: number;
}

/**
 * Represents user records for generated or requested content.
 *
 * @interface
 */
export interface UserThingRecords {
  /**
   * How many megapixelsteps this user has generated or requested.
   * 
   * @default 0
   * @type {number}
   */
  megapixelsteps: number;

  /**
   * How many tokens this user has generated or requested.
   * 
   * @default 0
   * @type {number}
   */
  tokens: number;
}

/**
 * Represents details of a user's contributions.
 *
 * @interface
 */
export interface ContributionDetails {
  /**
   * How many megapixelsteps this user has generated.
   *
   * @type {number}
   */
  megapixelsteps: number;

  /**
   * How many images this user has generated.
   *
   * @type {number}
   */
  fulfillments: number;
}

/**
 * Represents details of a user's usage.
 *
 * @interface
 */
export interface UsageDetails {
  /**
   * How many megapixelsteps this user has requested.
   *
   * @type {number}
   */
  megapixelsteps: number;

  /**
   * How many images this user has requested.
   *
   * @type {number}
   */
  requests: number;
}

/**
 * Represents monthly Kudos received by a user.
 *
 * @interface
 */
export interface MonthlyKudos {
  /**
   * How much recurring Kudos this user receives monthly.
   *
   * @type {number}
   */
  amount: number;

  /**
   * Last date this user received monthly Kudos.
   *
   * @type {Date}
   */
  last_received: Date;
}

/**
 * Represents Kudos details for a user.
 *
 * @interface
 */
export interface UserKudosDetails {
  /**
   * The amount of Kudos accumulated or used for generating images.
   *
   * @type {number}
   */
  accumulated: number;

  /**
   * The amount of Kudos this user has given to other users.
   *
   * @type {number}
   */
  gifted: number;

  /**
   * The amount of Kudos this user has been given by the Horde admins.
   *
   * @type {number}
   */
  admin: number;

  /**
   * The amount of Kudos this user has been given by other users.
   *
   * @type {number}
   */
  received: number;

  /**
   * The amount of Kudos this user has received from recurring rewards.
   *
   * @type {number}
   */
  recurring: number;

  /**
   * The amount of Kudos this user has been awarded from things like rating images.
   *
   * @type {number}
   */
  awarded: number;
}

/**
 * Represents various records related to a user.
 *
 * @interface
 */
export interface UserRecords {
  /**
   * User usage records.
   *
   * @type {UserThingRecords}
   */
  usage: UserThingRecords;

  /**
   * User contribution records.
   *
   * @type {UserThingRecords}
   */
  contribution: UserThingRecords;

  /**
   * User fulfillment records.
   *
   * @type {UserAmountRecords}
   */
  fulfillment: UserAmountRecords;

  /**
   * User request records.
   *
   * @type {UserAmountRecords}
   */
  request: UserAmountRecords;
}
/**
 * Represents user details.
 *
 * @interface
 */
export interface UserDetails {
  /**
   * The username of the user.
   *
   * @type {string}
   */
  username: string;

  /**
   * The unique identifier of the user.
   *
   * @type {number}
   */
  id: number;

  /**
   * The total number of kudos received by the user.
   *
   * @type {number}
   */
  kudos: number;

  /**
   * The number of kudos being evaluated for the user.
   *
   * @type {number}
   */
  evaluating_kudos: number;

  /**
   * The concurrency level associated with the user.
   *
   * @type {number}
   */
  concurrency: number;

  /**
   * The number of workers invited by the user.
   *
   * @type {number}
   */
  worker_invited: number;

  /**
   * Indicates whether the user is a moderator.
   *
   * @type {boolean}
   */
  moderator: boolean;

  /**
   * Kudos details for the user.
   *
   * @type {UserKudosDetails}
   */
  kudos_details: UserKudosDetails;

  /**
   * The count of workers associated with the user.
   *
   * @type {number}
   */
  worker_count: number;

  /**
   * An array of worker IDs related to the user.
   *
   * @type {string[]}
   */
  worker_ids: string[];

  /**
   * An array of shared key IDs associated with the user.
   *
   * @type {string[]}
   */
  sharedkey_ids: string[];

  /**
   * Monthly kudos received by the user.
   *
   * @type {MonthlyKudos}
   */
  monthly_kudos: MonthlyKudos;

  /**
   * Indicates whether the user is trusted.
   *
   * @type {boolean}
   */
  trusted: boolean;

  /**
   * Indicates whether the user is flagged.
   *
   * @type {boolean}
   */
  flagged: boolean;

  /**
   * Indicates whether the user is using a VPN.
   *
   * @type {boolean}
   */
  vpn: boolean;

  /**
   * Indicates whether the user has special status.
   *
   * @type {boolean}
   */
  special: boolean;

  /**
   * The number of suspicious activities associated with the user.
   *
   * @type {number}
   */
  suspicious: number;

  /**
   * Indicates whether the user is pseudonymous.
   *
   * @type {boolean}
   */
  pseudonymous: boolean;

  /**
   * The contact information for the user.
   *
   * @type {string}
   */
  contact: string;

  /**
   * Indicates the account age of the user.
   *
   * @type {boolean}
   */
  account_age: boolean;

  /**
   * Usage details for the user.
   *
   * @type {UsageDetails}
   */
  usage: UsageDetails;

  /**
   * Contribution details for the user.
   *
   * @type {ContributionDetails}
   */
  contributions: ContributionDetails;

  /**
   * Records related to the user.
   *
   * @type {UserRecords}
   */
  records: UserRecords;
}

/**
 * Represents a model in the system.
 *
 * @interface
 */
export interface Model {
  /**
   * The average speed of generation for this model in requests per minute.
   *
   * @type {number}
   */
  performance: number;

  /**
   * The number of items waiting to be generated by this model.
   *
   * @type {number}
   */
  queued: number;

  /**
   * The number of jobs waiting to be generated by this model.
   *
   * @type {number}
   */
  jobs: number;

  /**
   * Estimated time in seconds for this model's queue to be cleared.
   *
   * @type {number}
   */
  eta: number;

  /**
   * The type of the model, which can be either 'image' or 'text'.
   *
 	 * @default None
	 * @enum {string}
	 * @values ["image", "text"]
   * @type {'image' | 'text'}
   */
  type: 'image' | 'text';

  /**
   * The name of the model available to workers in this horde.
   *
   * @type {string}
   */
  name: string;

  /**
   * The number of workers in this horde that are running this model.
   *
   * @type {number}
   */
  count: number;
}

export interface ExtendedModel {
	available: boolean;
	baseline: string;
	config: {
		download: {
			file_name: string;
			file_path: string;
			file_url: string;
		}[];
		files: {
			md5sum: string;
			path: string;
			sha256sum: string;
		}[];
	};
	description: string;
	download_all: false;
	homepage: string;
	inpainting: boolean;
	name: string;
	nsfw: boolean;
	showcases?: string[];
	style: string;
	type: string;
	tags: string[];
	version: string;
}

export interface ApiError {
	message: string;
	errors?: Record<string, string>;
}

/**
 * Represents a payload for a Textual Inversion in the CivitAI system.
 *
 * @interface
 */
export interface ModelPayloadTextualInversionsStable {
	/**
	 * The exact name or CivitAI ID of the Textual Inversion.
	 *
	 * @example GlowingRunesAIV6
	 * @minLength 1
	 * @maxLength 255
	 */
	name: string;

	/**
	 * Specifies where the Textual Inversion should be injected.
	 *
	 * @default None
	 * @enum {string}
   * @type {"prompt" | "negprompt"}
	 * @values ["prompt", "negprompt"]
	 *
	 * If set, will automatically add this TI filename to the prompt or negative prompt accordingly using the provided strength.
	 * If this is set to None, then the user will have to manually add the embed to the prompt themselves.
	 */
	inject_ti?: 'prompt' | 'negprompt';

	/**
	 * The strength with which to apply the TI to the prompt. Only used when `inject_ti` is not None.
	 *
	 * @default 1
	 * @minimum -5
	 * @maximum 5
	 */
	strength?: number;
}

export interface ModelSpecialPayloadStable {
  "*"?: Record<string, any>
}

/**
 * Represents a payload for LoRa (Localizing Rationales) settings in the CivitAI system.
 *
 * @interface
 */
export interface ModelPayloadLorasStable {
  /**
   * The exact name or CivitAI ID of the LoRa.
   *
   * @example GlowingRunesAIV6
   * @minLength 1
   * @maxLength 255
   * @type {string}
   */
  name: string;

  /**
   * The strength of the LoRa to apply to the SD model.
   *
   * @default 1
   * @minimum -5
   * @maximum 5
   * @type {number}
   */
  model?: number;

  /**
   * The strength of the LoRa to apply to the clip model.
   *
   * @default 1
   * @minimum -5
   * @maximum 5
   * @type {number}
   */
  clip?: number;

  /**
   * If set, will try to discover a trigger for this LoRa which matches or is similar to this string
   * and inject it into the prompt. If 'any' is specified, it will pick the first trigger.
   *
   * @minLength 1
   * @maxLength 30
   * @type {string}
   */
  inject_trigger?: string;
}
export type Samplers = "k_lms" | "k_heun" | "k_euler" | "k_euler_a" | "k_dpm_2" |  "k_dpm_2_a" |  "k_dpm_fast" | "k_dpm_adaptive" | "k_dpmpp_2s_a" | "k_dpmpp_2m" | "dpmsolver" | "k_dpmpp_sde" | "DDIM"
export type PostProcessors = "GFPGAN" | "RealESRGAN_x4plus" | "RealESRGAN_x2plus" | "RealESRGAN_x4plus_anime_6B" | "NMKD_Siax" | "4x_AnimeSharp" | "CodeFormers" | "strip_background"
export type ControlTypes = "canny" | "hed" | "depth" | "normal" | "openpose" | "seg" | "scribble" | "fakescribbles" | "hough"

/**
 * Represents input parameters for generating models.
 *
 * @interface
 */
export interface ModelGenerationInputStable {
  /**
   * The name of the sampler to use for generation.
   *
   * @default k_euler_a
   * @example k_lms
   * @type {Samplers}
   */
  sampler_name?: Samplers;

  /**
   * The scaling factor for the configuration.
   *
   * @default 7.5
   * @minimum 0
   * @maximum 100
   * @multipleOf 0.5
   * @type {number}
   */
  cfg_scale?: number;

  /**
   * The denoising strength for the generated image.
   *
   * @example 0.75
   * @minimum 0.01
   * @maximum 1
   * @type {number}
   */
  denoising_strength?: number;

  /**
   * The seed used for generating the request. It can be text or numbers.
   *
   * @example The little seed that could
   * @type {string}
   */
  seed?: string;

  /**
   * The height of the image to generate.
   *
   * @default 512
   * @minimum 64
   * @maximum 3072
   * @multipleOf 64
   * @type {number}
   */
  height?: number;

  /**
   * The width of the image to generate.
   *
   * @default 512
   * @minimum 64
   * @maximum 3072
   * @multipleOf 64
   * @type {number}
   */
  width?: number;

  /**
   * The variation to apply to the seed value.
   *
   * @example 1
   * @minimum 1
   * @maximum 1000
   * @type {number}
   */
  seed_variation?: number;

  /**
   * The list of post-processors to apply to the image in the specified order.
   *
   * @uniqueItems true
   * @example [GFPGAN]
   * @type {PostProcessors[]}
   */
  post_processing?: PostProcessors[];

  /**
   * Set to true to enable Karras noise scheduling tweaks.
   *
   * @default false
   * @type {boolean}
   */
  karras?: boolean;

  /**
   * Set to true to create images that stitch together seamlessly.
   *
   * @default false
   * @type {boolean}
   */
  tiling?: boolean;

  /**
   * Set to true to process the image at base resolution before upscaling and re-processing.
   *
   * @default false
   * @type {boolean}
   */
  hires_fix?: boolean;

  /**
   * The number of CLIP language processor layers to skip.
   *
   * @example 1
   * @type {number}
   */
  clip_skip?: number;

  /**
   * The type of control for the image generation process.
   *
   * @example canny
   * @type {ControlTypes}
   */
  control_type?: ControlTypes;

  /**
   * Set to true if the image submitted is a pre-generated control map for ControlNet use.
   *
   * @default false
   * @type {boolean}
   */
  image_is_control?: boolean;

  /**
   * Set to true if you want the ControlNet map returned instead of a generated image.
   *
   * @default false
   * @type {boolean}
   */
  return_control_map?: boolean;

  /**
   * The strength of the face fixer.
   *
   * @example 0.75
   * @minimum 0
   * @maximum 1
   * @type {number}
   */
  facefixer_strength?: number;

  /**
   * LoRa settings for the model generation.
   *
   * @type {ModelPayloadLorasStable[]}
   */
  loras?: ModelPayloadLorasStable[];

  /**
   * Textual inversion settings for the model generation.
   *
   * @type {ModelPayloadTextualInversionsStable[]}
   */
  tis?: ModelPayloadTextualInversionsStable[];

  /**
   * Special payload settings for the model generation.
   *
   * @type {ModelSpecialPayloadStable}
   */
  special?: ModelSpecialPayloadStable;

  /**
   * The number of steps in the generation process.
   *
   * @default 30
   * @minimum 1
   * @maximum 500
   * @type {number}
   */
  steps?: number;

  /**
   * The amount of images to generate.
   *
   * @default 1
   * @minimum 1
   * @maximum 20
   * @type {number}
   */
  n?: number;
}

export type SourceProcessing = "img2img" | "inpainting" | "outpainting"

/**
 * Represents input parameters for generating content using the Stable Diffusion model.
 *
 * @interface
 */
export interface GenerationInputStable {
  /**
   * The prompt that will be sent to the Stable Diffusion model to generate content.
   *
   * @minLength 1
   * @type {string}
   */
  prompt: string;

  /**
   * Additional parameters for model generation.
   *
   * @type {ModelGenerationInputStable}
   */
  params?: ModelGenerationInputStable;

  /**
   * Set to true if this request is NSFW. This will skip workers that censor NSFW images.
   *
   * @default false
   * @type {boolean}
   */
  nsfw?: boolean;

  /**
   * When true, only trusted workers will serve this request. When false, evaluating workers will also be used, which can increase speed but adds more risk.
   *
   * @default false
   * @type {boolean}
   */
  trusted_workers?: boolean;

  /**
   * Allows slower workers to pick up this request when true. Disabling this incurs an extra kudos cost.
   *
   * @default true
   * @type {boolean}
   */
  slow_workers?: boolean;

  /**
   * If the request is SFW (Safe for Work), and the worker accidentally generates NSFW content, it will send back a censored image.
   *
   * @default false
   * @type {boolean}
   */
  censor_nsfw?: boolean;

  /**
   * Specify up to 5 workers who are allowed to service this request.
   *
   * @type {string[]}
   */
  workers?: string[];

  /**
   * If true, the worker list will be treated as a blacklist instead of a whitelist.
   *
   * @default false
   * @type {boolean}
   */
  worker_blacklist?: boolean;

  /**
   * Specify which models are allowed to be used for this request.
   *
   * @type {string[]}
   */
  models?: string[];

  /**
   * The Base64-encoded webp to use for img2img processing.
   *
   * @type {string}
   */
  source_image?: string;

  /**
   * Specifies how to process the source image.
   *
   * @default img2img
   * @example img2img
   * @type {SourceProcessing}
   */
  source_processing?: SourceProcessing;

  /**
   * If source_processing is set to 'inpainting' or 'outpainting', this parameter can be optionally provided as the Base64-encoded webp mask of the areas to inpaint. If not passed, the inpainting/outpainting mask has to be embedded as an alpha channel.
   *
   * @type {string}
   */
  source_mask?: string;

  /**
   * If true, the image will be sent via Cloudflare R2 download link.
   *
   * @default true
   * @type {boolean}
   */
  r2?: boolean;

  /**
   * If true, the image will be shared with LAION for improving their dataset. This will also reduce your kudos consumption by 2. For anonymous users, this is always true.
   *
   * @default false
   * @type {boolean}
   */
  shared?: boolean;

  /**
   * If enabled, suspicious prompts are sanitized through a string replacement filter.
   *
   * @default true
   * @type {boolean}
   */
  replacement_filter?: boolean;

  /**
   * When false, the endpoint will simply return the cost of the request in kudos and exit.
   *
   * @default false
   * @type {boolean}
   */
  dry_run?: boolean;
}

/**
 * Represents the status of a request, including job counts, completion status, and other relevant information.
 *
 * @interface
 */
export interface RequestStatusCheck {
  /**
   * The number of finished jobs in this request.
   *
   * @type {number}
   */
  finished: number;

  /**
   * The number of jobs still processing in this request.
   *
   * @type {number}
   */
  processing: number;

  /**
   * The number of jobs that timed out and had to be restarted or were reported as failed by a worker.
   *
   * @type {number}
   */
  restarted: number;

  /**
   * The number of jobs waiting to be picked up by a worker.
   *
   * @type {number}
   */
  waiting: number;

  /**
   * Indicates whether all jobs in this request are done (true) or not (false).
   *
   * @type {boolean}
   */
  done: boolean;

  /**
   * Indicates whether this request caused an internal server error and could not be completed (true) or not (false).
   *
   * @type {boolean}
   */
  faulted: boolean;

  /**
   * The expected amount of time (in seconds) to generate all jobs in this request.
   *
   * @type {number}
   */
  wait_time: number;

  /**
   * The position of this request in the requests queue. This position is determined by relative Kudos amounts.
   *
   * @type {number}
   */
  queue_position: number;

  /**
   * The total amount of Kudos consumed by this request until now.
   *
   * @type {number}
   */
  kudos: number;

  /**
   * Determines whether this request can be completed with the pool of workers currently available (true) or not (false).
   *
   * @default true
   * @type {boolean}
   */
  is_possible: boolean;
}

export type GenerationState = "ok" | "censored"

/**
 * Represents the state of image generation, including details about the worker, model, and generated image.
 *
 * @interface
 */
export interface GenerationStable {
  /**
   * The UUID of the worker which generated this image.
   *
   * @type {string}
   */
  worker_id: string;

  /**
   * The name of the worker which generated this image.
   *
   * @type {string}
   */
  worker_name: string;

  /**
   * The model which generated this image.
   *
   * @type {string}
   */
  model: string;

  /**
   * The state of this generation.
   *
   * @default ok
   * @example ok
   * @type {GenerationState}
   */
  state: GenerationState;

  /**
   * The generated image as a Base64-encoded .webp file.
   *
   * @type {string}
   */
  img: string;

  /**
   * The seed which generated this image.
   *
   * @type {string}
   */
  seed: string;

  /**
   * The ID for this image.
   *
   * @type {string}
   */
  id: string;

  /**
   * Indicates whether this image has been censored by the worker's safety filter (true) or not (false).
   *
   * @type {boolean}
   */
  censored: boolean;
}

/**
 * Represents the status of a request, including job counts, completion status, and information about generated images.
 *
 * @interface
 */
export interface RequestStatusStable extends RequestStatusCheck {
  /**
   * An array of generated images and their details.
   *
   * @type {GenerationStable[]}
   */
  generations: GenerationStable[];

  /**
   * Indicates whether these images have been shared with LAION (true) or not (false).
   *
   * @default false
   * @type {boolean}
   */
  shared?: boolean;
}