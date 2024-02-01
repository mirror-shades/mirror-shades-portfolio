import { writable } from 'svelte/store';

// Get the items from localStorage
const storedTheme = localStorage.getItem('theme');
const storedSite = localStorage.getItem('site');
const storedImagesJson = localStorage.getItem('images');
// Parse JSON to an array or use an empty array if nothing is stored
const storedImages = storedImagesJson ? JSON.parse(storedImagesJson) : [];

// Website UI
export let currentTheme = writable(storedTheme || "winter");
export let currentSite = writable(storedSite || "portfolio");

// AI
export let testEth = writable("0");
export let mirrorChips = writable("0");
export let account = writable(undefined);
export let chatbot = writable(true);
export let storedImageList = writable(storedImages);

//games
export let chips = writable(10);

// Push relevant values to local storage
storedImageList.subscribe((value) => localStorage.setItem('images', JSON.stringify(value)));
currentSite.subscribe((value) => localStorage.setItem('site', value));
currentTheme.subscribe((value) => localStorage.setItem('theme', value));