import type {
	RequestError,
	Model,
	UserDetails,
	GenerationInputStable,
	RequestAsync,
	RequestValidationError,
	RequestStatusCheck,
	RequestStatusStable,
	ExtendedModel,
	HordeUpdateIntervals,
	CacheObject,
	ModelSettingsComplex
} from './types';

export class HordeClient {
	private _baseURL: string;
	private _clientAgent: string;
	protected client_name: string;
	protected client_version: string;
	protected client_contact: string;
	protected cache: {
		recommendedModelSettings?: CacheObject<Record<string, ModelSettingsComplex>>;
		extendedModels?: CacheObject<Record<string, ExtendedModel>>;
		textModels?: CacheObject<Model[]>;
		imageModels?: CacheObject<Model[]>;
	};
	public hordeUpdateIntervals: HordeUpdateIntervals;
	constructor(
		client_name: string,
		client_version: string,
		client_contact: string,
		hordeUpdateIntervals: HordeUpdateIntervals = {
			resourceUpdateInterval: 60000,
			generationUpdateInterval: 1000
		}
	) {
		this.client_name = client_name;
		this.client_version = client_version;
		this.client_contact = client_contact;
		this._clientAgent = `${this.client_name}:${this.client_version}:${this.client_contact}`;
		this._baseURL = 'https://stablehorde.net/api/v2';
		this.hordeUpdateIntervals = hordeUpdateIntervals;
		this.cache = {};
	}

	/**
	 *
	 * @param obj takes any object
	 * @returns true if it's an error
	 */
	private _instanceOfRequestError(obj: any): obj is RequestError {
		return 'message' in obj;
	}
	/**
	 *
	 * @param obj takes any object
	 * @returns true if it's a validation error
	 */
	private _instanceOfRequestValidationError(obj: any): obj is RequestValidationError {
		return 'errors' in obj || 'message' in obj;
	}

	/**
	 *
	 * @param {string} model Takes a model name
	 * @returns the recommended model settings from cache or from github if cache is empty or older than 1 minute
	 */
	public async getRecommendedModelSettings(model?: string) {
		if (
			!this.cache.recommendedModelSettings ||
			Date.now() - this.hordeUpdateIntervals.resourceUpdateInterval >
				this.cache.recommendedModelSettings.lastUpdate
		) {
			const data = (await (
				await fetch('https://raw.githubusercontent.com/db0/Stable-Horde-Styles/main/styles.json')
			).json()) as unknown as Record<string, ModelSettingsComplex>;
			this.cache.recommendedModelSettings = {
				data,
				lastUpdate: Date.now()
			};
		}
		if (!model) {
			return this.cache.recommendedModelSettings.data;
		}
		model = model.toLowerCase();
		return this.cache.recommendedModelSettings.data[model];
	}
	/**
	 *
	 * @param {string} model Takes a model name
	 * @returns the extended models from cache or from github if cache is empty or older than 1 minute
	 */
	public async getExtendedModels(model?: string) {
		if (
			!this.cache.extendedModels ||
			Date.now() - this.hordeUpdateIntervals.resourceUpdateInterval >
				this.cache.extendedModels.lastUpdate
		) {
			const data = (await (
				await fetch(
					'https://raw.githubusercontent.com/db0/AI-Horde-image-model-reference/main/stable_diffusion.json'
				)
			).json()) as unknown as Record<string, ExtendedModel>;
			this.cache.extendedModels = {
				data,
				lastUpdate: Date.now()
			};
		}
		if (!model) {
			return this.cache.extendedModels.data;
		}
		return this.cache.extendedModels.data[model];
	}

	/**
	 *
	 * @param {string} token the user's token
	 * @returns the user's details if existent or throws error
	 */
	public async findUser(token: string) {
		const userDetails = (await (
			await fetch(`${this._baseURL}/find_user`, {
				headers: {
					apikey: token,
					'Client-Agent': this._clientAgent
				}
			})
		).json()) as unknown as UserDetails | RequestError;
		if (this._instanceOfRequestError(userDetails)) {
			throw new Error(userDetails.message);
		}
		return userDetails as UserDetails;
	}
	/**
	 *
	 * @param {'image' | 'text'} type type of model needed
	 * @returns an array of models
	 */
	public async getModels(type: 'image' | 'text') {
		if (
			type === 'image' &&
			this.cache.imageModels &&
			Date.now() - this.hordeUpdateIntervals.resourceUpdateInterval >
				this.cache.imageModels.lastUpdate
		) {
			return this.cache.imageModels.data;
		}
		if (
			type === 'text' &&
			this.cache.textModels &&
			Date.now() - this.hordeUpdateIntervals.resourceUpdateInterval >
				this.cache.textModels.lastUpdate
		) {
			return this.cache.textModels.data;
		}
		const data = (
			await fetch(`${this._baseURL}/status/models?type=${type}`, {
				headers: {
					'Client-Agent': this._clientAgent
				}
			})
		).json() as unknown as Model[];
		switch (type) {
			case 'image':
				this.cache.imageModels = {
					data,
					lastUpdate: Date.now()
				};
				break;
			case 'text':
				this.cache.textModels = {
					data,
					lastUpdate: Date.now()
				};
				break;
		}
		return data;
	}

	/**
	 *
	 * @param {string} token the user's token
	 * @param {GenerationInputStable} payload the generation data
	 * @returns
	 */
	public async submitRequest(token: string, payload: GenerationInputStable) {
		const submittedRequest = (
			await fetch(`${this._baseURL}/generate/async`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					apikey: token,
					'Client-Agent': this._clientAgent
				},
				body: JSON.stringify(payload)
			})
		).json() as unknown as RequestAsync | RequestValidationError;
		if (this._instanceOfRequestValidationError(submittedRequest)) {
			throw new Error(submittedRequest.message);
		}
		return submittedRequest as RequestAsync;
	}

	/**
	 *
	 * @param {string} token the user's token
	 * @param {string} requestID the request ID
	 * @returns
	 */
	public async checkRequest(token: string, requestID: string) {
		const checkedRequest = (
			await fetch(`${this._baseURL}/generate/check/${requestID}`, {
				headers: {
					apikey: token,
					'Client-Agent': this._clientAgent
				}
			})
		).json() as unknown as RequestStatusCheck | RequestError;
		if (this._instanceOfRequestError(checkedRequest)) {
			throw new Error(checkedRequest.message);
		}
		return checkedRequest as RequestStatusCheck;
	}

	/**
	 *
	 * @param {string} token the user's token
	 * @param {string} requestID the request ID
	 * @returns
	 */
	public async getResults(token: string, requestID: string) {
		const resultReq = (
			await fetch(`${this._baseURL}/generate/status/${requestID}`, {
				headers: {
					apikey: token,
					'Client-Agent': this._clientAgent
				}
			})
		).json() as unknown as RequestStatusStable | RequestError;
		if (this._instanceOfRequestError(resultReq)) {
			throw new Error(resultReq.message);
		}
		return resultReq as RequestStatusStable;
	}

	/**
	 *
	 * @param {string} token the user's token
	 * @param {GenerationInputStable} payload the generation data
	 * @callback requestSubmittedCallback Used when request is submitted
	 * @callback requestCompleteCallback Used when request is completed
	 * @callback requestErrorCallback Used when request errors
	 * @callback requestCheckCallback Used on each request check
	 * @returns
	 */

	public async asyncImageGen(
		token: string,
		payload: GenerationInputStable,
		requestSubmittedCallback: (req: RequestAsync) => void,
		requestCompleteCallback: (reqStatus: RequestStatusStable) => void,
		requestErrorCallback: (err: any) => void,
		requestCheckCallback: (reqStatus: RequestStatusCheck) => void = () => null
	) {
		const submittedRequest = await this.submitRequest(token, payload);
		requestSubmittedCallback(submittedRequest);
		let checkReq = await this.checkRequest(token, submittedRequest.id).catch((err) => {
			requestErrorCallback(err);
			return;
		});
		if (!checkReq) {
			return;
		}
		let time = 0;
		const timer = setInterval(() => (time += 1), 1000);
		while (!checkReq.done && !checkReq.faulted && time < 600) {
			requestCheckCallback(checkReq);
			await new Promise((resolve) =>
				setTimeout(resolve, this.hordeUpdateIntervals.generationUpdateInterval)
			);
			time += 1;
			checkReq = await this.checkRequest(token, submittedRequest.id);
		}

		clearInterval(timer);

		if (time >= 599) {
			requestErrorCallback({ message: 'Request timed out' });
			return;
		}

		if (checkReq.faulted) {
			requestErrorCallback({ message: 'Request faulted' });
			return;
		}

		const resultReq = await this.getResults(token, submittedRequest.id);
		if (resultReq.faulted) {
			requestErrorCallback(resultReq);
			return;
		}
		requestCompleteCallback(resultReq);
	}
}

export * from './types';
