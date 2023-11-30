/**
 * The authentication token used for backend communication.
 * @type {string}
 */
const BACKEND_TOKEN = 'FRE0UTOZCHFF8Z8N6T3DXIIG7KHYOC6NF0EJY419';


/**
 * The URL of the backend endpoint for storing and retrieving items.
 * @type {string}
 */
const BACKEND_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Sets an item in the backend storage.
 * @param {string} key - The key for the item.
 * @param {any} value - The value to be stored.
 * @returns {Promise<Object>} A promise that resolves to the response JSON from the backend.
 * @throws {string} Throws an error if the backend response does not contain data.
 */
async function setItem(key, value) {
    const payload = { key, value, token: BACKEND_TOKEN };
    return fetch(BACKEND_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}


/**
 * Gets an item from the backend storage using the specified key.
 * @param {string} key - The key for the item.
 * @returns {Promise<any>} A promise that resolves to the value of the retrieved item.
 * @throws {string} Throws an error if the backend response does not contain data or if the item is not found.
 */
async function getItem(key) {
    const url = `${BACKEND_URL}?key=${key}&token=${BACKEND_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}