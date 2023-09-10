import type { ApiError, Model, UserDetails } from './types'

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

  private instanceOfApiError (obj: any): obj is ApiError {
    return 'message' in obj
  }

  public async findUser (token: string) {
    const userDetails = await (await fetch (`${this._baseURL}/find_user`, {headers: {
      apikey: token,
      'Client-Agent': this._clientAgent
    }})).json() as unknown as UserDetails | ApiError
    if (this.instanceOfApiError(userDetails)) {
      throw new Error(userDetails.message)
    }
    return userDetails as UserDetails
  }
  public async getModels (type: "image" | "text") {
    return (await fetch (`${this._baseURL}/status/models?type=${type}`, {headers: {
      'Client-Agent': this._clientAgent
    }})).json() as unknown as Model[]
  }
}

export * from './types'