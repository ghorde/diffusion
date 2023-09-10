import { hordeClient } from "$lib"

export const GET = async () => {
  const imageModels = await hordeClient.getModels("image")
  const textModels = await hordeClient.getModels("text")
  const models = [...imageModels, ...textModels].sort((a, b) => a.name.localeCompare(b.name))
  return new Response(JSON.stringify(models), {headers: {'content-type': 'application/json'}})
}