import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { visit } from "unist-util-visit";
import { Node } from "unist";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(title: string) {
  const slugParts = title
    .replace(/[\s/—]+/g, " ")
    .toLowerCase()
    .split("(");

  const fileName = `${slugParts[0].trim().split(" ").join("-")}`;

  return fileName[fileName.length - 1] === "?"
    ? fileName.slice(0, -1)
    : fileName;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Returns a remark plugin that fills the `headings` array you pass in
 * while the Markdown is being parsed. No React state here.
 */
export function collectHeadings(headings: Heading[]) {
  return () => (tree: Node) => {
    visit(
      tree,
      "heading",
      (
        node: Node & {
          children: Array<{ type: string; value: string }>;
          depth: number;
        }
      ) => {
        // ① raw text
        const text = node.children
          .filter((c) => c.type === "text" || c.type === "inlineCode")
          .map((c) => c.value)
          .join("");

        // ② use the same algorithm as rehype-slug
        const id = text
          .toLowerCase()
          .replace(/[\s—]+/g, "-") // Replace spaces and em dashes with hyphens
          .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphens
          .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

        headings.push({ id, text, level: node.depth });
      }
    );
  };
}
