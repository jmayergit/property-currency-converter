import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),
    integrations: [tailwind({ applyBaseStyles: false }), react()],
})
