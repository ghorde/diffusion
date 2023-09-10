import { hordeClient } from "$lib";
import type { UserDetails } from "$lib";

export const load = async ({ locals }) => {
	const user = locals.user
  if (!user || !user.hordeKey) {
    return {
      user: undefined,
      hordeUser: undefined
    }
  }
  let hordeUser: UserDetails | undefined
  if (user.hordeKey !== "0000000000") {
    try {
      hordeUser = await hordeClient.findUser(user.hordeKey);
    } catch {
      hordeUser = undefined
    }
  }
  return {
    user, hordeUser
  }
}