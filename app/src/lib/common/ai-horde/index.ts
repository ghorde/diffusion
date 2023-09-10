import type { RequestError, Model, UserDetails, GenerationInputStable, RequestAsync, RequestValidationError, RequestStatusCheck } from './types'

export class HordeClient {
  private _baseURL: string
  private _clientAgent: string
  protected client_name: string
  protected client_version: string
  protected client_contact: string
  constructor(client_name: string, client_version: string, client_contact: string) {
    this.client_name = client_name
    this.client_version = client_version
    this.client_contact = client_contact
    this._clientAgent = `${this.client_name}:${this.client_version}:${this.client_contact}`
    this._baseURL = 'https://stablehorde.net/api/v2'
  }

  private instanceOfRequestError (obj: any): obj is RequestError {
    return 'message' in obj
  }

  private instanceOfRequestValidationError (obj: any): obj is RequestValidationError {
    return ('errors' in obj || 'message' in obj)
  }

  public async findUser (token: string) {
    const userDetails = await (await fetch (`${this._baseURL}/find_user`, {headers: {
      apikey: token,
      'Client-Agent': this._clientAgent
    }})).json() as unknown as UserDetails | RequestError
    if (this.instanceOfRequestError(userDetails)) {
      throw new Error(userDetails.message)
    }
    return userDetails as UserDetails
  }

  public async getModels (type: "image" | "text") {
    return (await fetch (`${this._baseURL}/status/models?type=${type}`, {headers: {
      'Client-Agent': this._clientAgent
    }})).json() as unknown as Model[]
  }

  public async submitRequest (token: string, payload: GenerationInputStable) {
    const submittedRequest = (await fetch(`${this._baseURL}/generate/async`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: token,
        'Client-Agent': this._clientAgent
      },
      body: JSON.stringify(payload)
    })).json() as unknown as RequestAsync | RequestValidationError
    if (this.instanceOfRequestValidationError(submittedRequest)) {
      throw new Error(submittedRequest.message)
    }
    return submittedRequest as RequestAsync
  }

  public async checkRequest (token: string, requestID: string) {
    const checkedRequest = (await fetch(`${this._baseURL}/generate/check/${requestID}`, {
      headers: {
        apikey: token,
        'Client-Agent': this._clientAgent
      }
    })).json() as unknown as RequestStatusCheck | RequestError
    if (this.instanceOfRequestError(checkedRequest)) {
      throw new Error(checkedRequest.message)
    }
    return checkedRequest as RequestStatusCheck
  }

  public async getResults (token: string, requestID: string) {
    const resultReq = (await fetch(`${this._baseURL}/generate/status/${requestID}`, {
      headers: {
        apikey: token,
        'Client-Agent': this._clientAgent
      }
    })).json() as unknown as RequestStatusCheck | RequestError
    if (this.instanceOfRequestError(resultReq)) {
      throw new Error(resultReq.message)
    }
    return resultReq as RequestStatusCheck
  }
}

export * from './types'