<script>
	import img from '$lib/images/portfolio.jpg';
	import Mountain from './Mountain.svelte';
	import GithubIcon from '../icons/GithubIcon.svelte';
	import LinkedinIcon from '../icons/LinkedinIcon.svelte';
	import XIcon from '../icons/XIcon.svelte';
	import InstagramIcon from '../icons/InstagramIcon.svelte';
</script>

<div class="intro">
	<img src={img} alt="Black and white me with ocean background." class="img" />
	<div class="text">
		<p>Hi, I'm a software engineer & digital nomad from Serbia.</p>
		<p>Former (maybe future) electronics engineer.</p>
		<p class="top-margin">This is where I share my insights on software, AI, and tech.</p>
		<p class="top-margin">I enjoy immersing myself in nature & doing outdoorsy stuff.</p>
		<p>I LOVE to read. & sometimes I draw.</p>
		<div class="social-icons">
			<a href="https://github.com/diksipav" target="_blank" class="icon"><GithubIcon /></a>
			<a href="https://www.linkedin.com/in/diksipav/" target="_blank" class="icon"
				><LinkedinIcon /></a
			>
			<a href="https://twitter.com/diksipav" target="_blank" class="icon"><XIcon /></a>
			<a href="https://www.instagram.com/dijana.pavlovic_/" target="_blank" class="icon"
				><InstagramIcon /></a
			>
		</div>
		<Mountain class="mountain-wrapper" />
	</div>
</div>

<style lang="scss">
	.intro {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-area: intro;
		position: relative;

		.img {
			@include responsive(width, 180px, $xxl: 200px);
			@include responsive(height, 180px, $xxl: 200px);
			border-radius: 50%;
			background: pink;
			margin: 48px 24px 30px 24px;
			box-shadow:
				0 4px 8px 0 rgba(0, 0, 0, 0.2),
				0 6px 20px 0 rgba(0, 0, 0, 0.19);
		}

		.text {
			text-align: center;
			position: relative;

			.top-margin {
				margin-top: 16px;
			}
		}

		.social-icons {
			display: flex;
			justify-content: center;
			gap: 10px;
			margin-top: 12px;

			.icon {
				color: var(--font-color);
				border-bottom: none;
			}
		}
	}

	.text :global(.mountain-wrapper) {
		@include responsive(display, none, $sm: block);
		@include responsive(transform, none, $sm: scale(0.84), $lg: none);
		position: absolute;
		@include responsive(bottom, -36px, $lg: -48px, $xl: -68px);
		@include responsive(right, 256px, $lg: 170px, $xl: 204px);
		opacity: 0.7;
		z-index: -1;

		@include darkTheme {
			opacity: 0.4;
		}
	}
</style>
