<script>
	import { onMount } from 'svelte';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import DarkThemeIcon from '$lib/icons/DarkThemeIcon.svelte';
	import LightThemeIcon from '$lib/icons/LightThemeIcon.svelte';
	import '../app.scss';

	let theme = 'dark';

	onMount(() => {
		// Access localStorage and document only in the browser
		theme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		console.log('too');
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<div class="header-wrapper">
	<div class="header">
		<a href="/" class="logo">dijana pavlović</a>
		<Nav />
		<button on:click={toggleTheme} class="themeBtn">
			{#if theme === 'light'}
				<DarkThemeIcon />
			{:else}
				<LightThemeIcon />
			{/if}
		</button>
	</div>
</div>
<div class="main-wrapper">
	<main class={`${theme}-theme`}>
		<slot />
	</main>
</div>
<Footer />

<style lang="scss">
	.header-wrapper {
		position: sticky;
		top: 0px;
		@include responsive(background-color, var(--bg-color), $lg: unset);
		@include responsive(opacity, 0.8, $lg: unset);
		@include responsive(padding, 12px 12px 0 12px, $sm: 20px 20px 0 20px);
		z-index: 2;

		&::before {
			position: absolute;
			content: '';
			width: 100%;
			height: 12px;
			@include responsive(height, 12px, $sm: 20px);
			@include responsive(width, 100%, $lg: 100px);
			left: 0;
			top: 0;
			background-color: var(--bg-color);
		}

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80px;
			position: relative;
			@include responsive(padding, 0 10px 0 12px, $sm: 0 20px);

			$border: 1px solid var(--link-gray);
			@include responsive(border-left, none, $sm: $border);

			&::before,
			&::after {
				position: absolute;
				content: '';
				pointer-events: none;
			}

			&::before {
				@include responsive(width, 142px, $sm: 278px, $lg: 300px, $xl: 340px);
				height: 1px;
				left: 0;
				top: -1px;
				@include responsive(border-top, none, $sm: $border);
			}

			&::after {
				@include responsive(height, 80px, $lg: 150px);
				@include responsive(width, calc(100vw - 168px), $sm: calc(100vw - 320px), $lg: 100px);
				right: 0;
				top: -1px;
				@include responsive(border-top, none, $sm: $border);
				@include responsive(border-right, none, $sm: $border);
			}

			.logo {
				color: var(--link-gray);
				border: none;
				font-family: THICCCBOI-ExtraBold, Arial, sans-serif;
				font-size: 26px;
				line-height: 28px;
				font-weight: 700;
				margin: 0px;
				padding: 2px 0px 8px 0px;
				@include responsive(width, 124px, $sm: fit-content);

				@include breakpoint(sm) {
					padding: 16px 0 20px 0;
					font-size: 32px;
					line-height: 40px;
				}
			}

			.themeBtn {
				background: transparent;
				outline: none;
				border: none;
				cursor: pointer;
				position: absolute;
				z-index: 1;
				@include responsive(top, 2px, $sm: 13px);
				@include responsive(right, -2px, $sm: 11px);
			}
		}
	}

	.main-wrapper {
		min-height: calc(100vh - 135px);
		@include responsive(padding, 0 12px, $sm: 0 20px);
		display: flex;
		flex-direction: column;

		main {
			flex-grow: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			@include responsive(padding-top, 20px, $lg: 0);
			@include responsive(padding-bottom, 80px, $lg: 46px);
			@include responsive(border-left, none, $sm: 1px solid var(--link-gray));
		}
	}
</style>
