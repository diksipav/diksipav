import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkFrontmatter from 'remark-frontmatter';
import relativeImages from 'mdsvex-relative-images';
import { visit } from 'unist-util-visit';

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '');
}

function remarkHeadingId() {
	return (tree, file) => {
		let headings = [];
		visit(tree, 'heading', (node) => {
			const textNode = node.children.find((n) => n.type === 'text');
			if (textNode) {
				const id = slugify(textNode.value);
				node.data = node.data || {};
				node.data.hProperties = node.data.hProperties || {};
				node.data.hProperties.id = id;
				headings.push({ id: id, text: textNode.value, level: node.depth });
			}
		});

		// Initialize file.data and fm if they don't exist
		file.data = file.data || {};
		file.data.fm = file.data.fm || {};
		file.data.fm.headings = headings.slice(1);
	};
}

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [relativeImages, remarkHeadingId, remarkFrontmatter],
	rehypePlugins: []
});

export default config;
