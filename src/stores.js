import { writable } from 'svelte/store'

export const sampleSize = writable(100)

export const confidenceLevel = writable(0.5)