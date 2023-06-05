import {browser} from "$app/environment";
import {get_api_key} from "$lib/client_utils";

export async function load() {
    const api_key = browser ? get_api_key() : undefined;
    return {api_key};
}