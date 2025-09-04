//global localStorage saving
export function savedStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}