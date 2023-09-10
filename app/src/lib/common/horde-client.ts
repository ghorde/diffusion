import { PUBLIC_HORDE_CLIENT_NAME, PUBLIC_HORDE_CLIENT_VERSION, PUBLIC_HORDE_CLIENT_CONTACT } from "$env/static/public";
import { HordeClient } from "./ai-horde";

export const hordeClient = new HordeClient(PUBLIC_HORDE_CLIENT_NAME, PUBLIC_HORDE_CLIENT_VERSION, PUBLIC_HORDE_CLIENT_CONTACT)