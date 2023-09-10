export interface UserAmountRecords {
  image: number,
  text: number,
  interrogation: number
}

export interface UserThingRecords {
  megapixelsteps: number,
  tokens: number
}

export interface ContributionDetails { 
  megapixelsteps: number,
  fulfillments: number
}

export interface UsageDetails {
  megapixelsteps: number,
  requests: number
}

export interface RxKudos {
  amount: number,
  last_recieved: Date
}

export interface KudosDetails {
  accumulated: number,
  gifted: number,
  admin: number,
  recieved: number,
  recurring: number,
  awarded: number
}

export interface UserRecords {
  usage: UserThingRecords,
  contribution: UserThingRecords,
  fulfillment: UserAmountRecords,
  request: UserAmountRecords
}

export interface UserDetails {
  username: string,
  id: number,
  kudos: number,
  evaluating_kudos: number,
  concurrency: number,
  worker_invited: number,
  moderator: boolean,
  kudos_details: KudosDetails,
  worker_count: number,
  worker_ids: string[],
  sharedkey_ids: string[],
  monthly_kudos: RxKudos,
  trusted: boolean,
  flagged: boolean,
  vpn: boolean,
  special: boolean,
  suspicious: number,
  pseudonymous: boolean,
  contact: string,
  account_age: boolean,
  usage: UsageDetails,
  contributions: ContributionDetails,
  records: UserRecords
}

export interface Model {
  performance: number,
  queued: number,
  jobs: number,
  eta: number,
  type: "image" | "text",
  name: string,
  count: number
}

export interface ExtendedModel {
  available: boolean
  baseline: string
  config: {
    download: {
      file_name: string
      file_path: string
      file_url: string
    }[],
    files: {
      md5sum: string
      path: string
      sha256sum: string
    }[]
  }
  description: string
  download_all: false
  homepage: string
  inpainting: boolean
  name: string
  nsfw: boolean
  showcases?: string[]
  style: string
  type: string
  tags: string[]
  version: string
}