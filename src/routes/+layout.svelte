<script>
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '../app.scss';
</script>

<div class="header-wrapper">
	<div class="header">
		<a href="/" class="logo">dijana pavlović</a>
		<Nav />
	</div>
</div>
<div class="main-wrapper">
	<main>
		<slot />
	</main>
</div>
<Footer />

<style lang="scss">
	.header-wrapper {
		position: sticky;
		top: 0px;
		@include responsive(background-color, rgba(33, 33, 33, 0.8), $xl: unset);
		@include responsive(padding, 12px 12px 0 12px, $md: 20px 20px 0 20px);
		z-index: 1;

		&::before {
			position: absolute;
			content: '';
			width: 100%;
			height: 12px;
			@include responsive(height, 12px, $md: 20px);
			@include responsive(width, 100%, $xl: 100px);
			left: 0;
			top: 0;
			background-color: #1f1f1f;
		}

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80px;
			position: relative;
			@include responsive(padding, 0 10px 0 12px, $md: 0 20px);

			$border: 1px solid #acaaa6;
			border-left: $border;

			&::before,
			&::after {
				position: absolute;
				content: '';
				pointer-events: none;
			}

			&::before {
				@include responsive(width, 142px, $md: 278px, $xl: 300px, $xxl: 340px);
				height: 1px;
				left: 0;
				top: -1px;
				border-top: $border;
			}

			&::after {
				@include responsive(height, 80px, $xl: 150px);
				@include responsive(width, calc(100vw - 168px), $md: calc(100vw - 320px), $xl: 100px);
				right: 0;
				top: -1px;
				border-right: $border;
				border-top: $border;
			}

			.logo {
				color: #acaaa6;
				border: none;
				font-family: THICCCBOI-ExtraBold, Arial, sans-serif;
				font-size: 30px;
				line-height: 34px;
				font-weight: 700;
				margin: 0px;
				padding: 6px 0px 8px 0px;
				@include responsive(width, 124px, $md: fit-content);

				@include breakpoint(md) {
					padding: 16px 0 20px 0;
					font-size: 32px;
					line-height: 40px;
				}
			}
		}
	}

	.main-wrapper {
		min-height: calc(100vh - 130.5px);
		@include responsive(padding, 0 12px, $md: 0 20px);
		display: flex;

		main {
			$border: 1px solid #acaaa6;
			border-left: $border;
			flex-grow: 1;
			padding-top: 40px;
			padding-bottom: 80px;
			@include responsive(display, flex, $xl: block);
			justify-content: center;
		}
	}
</style>
