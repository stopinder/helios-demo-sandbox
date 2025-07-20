export type Tag = {
    id: string
    name: string
    category: 'IFS' | 'Astro' | 'Mode' | 'Custom'
    color?: string
    description?: string
}

