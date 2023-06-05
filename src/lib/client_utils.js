const api_key_name = 'LA-api-key';

export function get_api_key() {
    return window.localStorage.getItem(api_key_name);
}

export function set_api_key(key) {
    window.localStorage.setItem(api_key_name, key);
}