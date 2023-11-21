import { writable } from 'svelte/store';
//website ui
export let currentTheme = writable("winter")
export let currentSite = writable("portfolio")
//chatbot
export let chatbot = writable(true)