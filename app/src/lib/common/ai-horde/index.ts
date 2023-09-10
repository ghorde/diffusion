import type { Model, UserDetails } from './types'

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
  public async findUser (token: string) {
    return (await fetch (`${this._baseURL}/find_user`, {headers: {
      apikey: token,
      'Client-Agent': this._clientAgent
    }})).json() as unknown as UserDetails
  }
  public async getModels (type: "image" | "text") {
    return (await fetch (`${this._baseURL}/status/models?type=${type}`, {headers: {
      'Client-Agent': this._clientAgent
    }})).json() as unknown as Model[]
  }
}

export * from './types'