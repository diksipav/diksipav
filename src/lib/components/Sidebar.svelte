<script lang="ts">
	export let headings: any;
</script>

<div class="sidebar">
	<nav>
		{#each headings.filter((h) => h.level == 2) as heading}
			<a href={`#${heading.id}`}>{heading.text}</a>
		{/each}
	</nav>
</div>

<style lang="scss">
	.sidebar {
		display: none;

		@include breakpoint(md) {
			display: block;

			width: calc(50% - 300px);
			position: fixed;
			top: 28vh;
			left: 24px;
		}
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 157px;
		margin: auto;

		a {
			@include responsive(font-size, 15px, $xxl: 16px);
			line-height: 20px;
			color: var(--link-gray);
		}

		a:hover {
			border-bottom: none;
			color: var(--link-color);
		}
	}
</style>
