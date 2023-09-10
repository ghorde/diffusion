import type { ExtendedModel, Model } from '$lib'

export const load = async ({fetch}) => {
  const getModels = async () => {
    let models: Model[] = []
    models = (await fetch('/api/v1/get-models')).json() as unknown as Model[]
    return models
  }
  const getExtendedModels = async () => {
    let extendedModels: Record<string, ExtendedModel> = {}
    extendedModels = await (await fetch('https://raw.githubusercontent.com/db0/AI-Horde-image-model-reference/main/stable_diffusion.json')).json() as Record<string, ExtendedModel>
    return extendedModels
  }
  return {lazy: {models: getModels(), extendedModels: getExtendedModels()}}
}