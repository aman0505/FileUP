import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	resolve: {
		alias: {
		  $houdini: path.resolve('.', '$houdini'),
		},
	  },
        server: {
            fs: {
				// Allow serving files from one level up to the project root
				allow: ['..'],
			  },
        },
		

});