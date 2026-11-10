// Favoritformler – gemmes kun i denne browser (localStorage).
const KEY = 'formelsamling.favoritter';
const listeners = new Set();

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}

const favs = load();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...favs]));
  } catch { /* privat vindue eller blokeret lager: favoritterne lever så kun, til siden lukkes */ }
}

export const has = (key) => favs.has(key);
export const all = () => [...favs];
export const count = () => favs.size;

export function toggle(key) {
  if (favs.has(key)) favs.delete(key);
  else favs.add(key);
  save();
  for (const fn of listeners) fn();
  return favs.has(key);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
