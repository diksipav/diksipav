import { readFile } from 'fs/promises';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cover Letter | Dijana Pavlovic',
  description: 'My journey toward system engineering in Rust.',
};

async function getCoverLetter() {
  try {
    const filePath = join(process.cwd(), 'public/content/cover-letter.md');
    const content = await readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error loading cover letter:', error);
    return '';
  }
}

export default async function CoverLetterPage() {
  const content = await getCoverLetter();

  return (
    <div className="px-5 sm:px-11 min-h-[calc(100vh-80px-35px)] my-10 md:my-20">
      <div className="max-w-4xl mx-auto py-8">
        <article className="prose prose-invert dark:prose-dark lg:prose-xl max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
