import { fail, redirect } from "@sveltejs/kit";
import {db} from "$lib/server"

export const actions = {
  updateSettings: async ({request, locals}) => {
    const data = await request.formData();

    const newHordeToken = data.get('hordeToken');
    if (!newHordeToken || typeof newHordeToken !== 'string') {
      throw redirect(302, '/settings');
    }

    const hordeClient = getHordeClient(newHordeToken);

    try {
      hordeUser = await hordeClient.findUser({
        token: newHordeToken
      });
    } catch {
      return fail(400, {hordeToken: newHordeToken, invalid: true})
    }

    await db.diffusionUser.update({
      where: {
        id: locals.user.id
      },
      data: {
        hordeKey: newHordeToken,
      }
    })

    return {success: true, data: hordeUser}
  }
}