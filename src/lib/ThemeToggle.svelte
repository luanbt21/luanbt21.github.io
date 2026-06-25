<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark' | 'system';
	let currentTheme = $state<Theme>('system');
	let isOpen = $state(false);

	function applyTheme(theme: Theme) {
		currentTheme = theme;
		localStorage.setItem('portfolio-theme', theme);

		const root = document.documentElement;
		if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
		if (savedTheme) {
			applyTheme(savedTheme);
		} else {
			applyTheme('system');
		}

		// Watch system preference changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemThemeChange = () => {
			if (currentTheme === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleSystemThemeChange);
		return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
	});
</script>

<div class="relative inline-block text-left z-50">
	<button
		onclick={() => isOpen = !isOpen}
		class="glass-panel text-sm font-medium rounded-full p-2 px-3 flex items-center space-x-1.5 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 text-slate-800 dark:text-slate-100 hover:scale-105 transition-transform cursor-pointer"
		aria-label="Toggle theme"
	>
		{#if currentTheme === 'light'}
			<svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
			</svg>
		{:else if currentTheme === 'dark'}
			<svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
			</svg>
		{:else}
			<svg class="w-4 h-4 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
		{/if}
		<span class="capitalize text-xs hidden sm:inline">{currentTheme}</span>
		<svg class="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={() => isOpen = false} class="fixed inset-0 z-40"></div>
		<div class="absolute right-0 mt-2 w-32 origin-top-right rounded-xl glass-panel shadow-lg ring-1 ring-black/5 focus:outline-none z-50 p-1 flex flex-col gap-0.5">
			<button
				onclick={() => { applyTheme('light'); isOpen = false; }}
				class="flex items-center w-full px-3 py-1.5 text-xs text-left rounded-lg transition-colors cursor-pointer {currentTheme === 'light' ? 'bg-brand-purple/10 text-brand-purple dark:text-brand-purple font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'}"
			>
				<svg class="w-3.5 h-3.5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
				Light
			</button>
			<button
				onclick={() => { applyTheme('dark'); isOpen = false; }}
				class="flex items-center w-full px-3 py-1.5 text-xs text-left rounded-lg transition-colors cursor-pointer {currentTheme === 'dark' ? 'bg-brand-purple/10 text-brand-purple dark:text-indigo-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'}"
			>
				<svg class="w-3.5 h-3.5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
				</svg>
				Dark
			</button>
			<button
				onclick={() => { applyTheme('system'); isOpen = false; }}
				class="flex items-center w-full px-3 py-1.5 text-xs text-left rounded-lg transition-colors cursor-pointer {currentTheme === 'system' ? 'bg-brand-purple/10 text-brand-purple dark:text-brand-cyan font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'}"
			>
				<svg class="w-3.5 h-3.5 mr-2 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				System
			</button>
		</div>
	{/if}
</div>
