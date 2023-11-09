import { writable } from 'svelte/store';

export let currentTheme = writable("light")
export let currentSite = writable("intro")