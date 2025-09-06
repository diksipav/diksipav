export default function BragDocumentPage() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}

// import { readFile } from 'fs/promises';
// import { join } from 'path';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Brag Document | Dijana Pavlovic',
//   description: 'My professional achievements and journey',
// };

// async function getBragContent() {
//   try {
//     const filePath = join(process.cwd(), 'public/content/brag-doc.md');
//     const content = await readFile(filePath, 'utf-8');
//     return content;
//   } catch (error) {
//     console.error('Error loading brag document:', error);
//     return '';
//   }
// }

// export default async function BragDocumentPage() {
//   const content = await getBragContent();

//   return (
//     <div className="px-3 sm:px-5 md:px-11 min-h-[calc(100vh-80px-35px)]">
//       <div className="max-w-4xl mx-auto py-8">
//         <h1 className="text-4xl font-bold mb-8">Brag Document</h1>
//         <article className="prose prose-invert dark:prose-dark lg:prose-xl max-w-none">
//           <ReactMarkdown remarkPlugins={[remarkGfm]}>
//             {content}
//           </ReactMarkdown>
//         </article>
//       </div>
//     </div>
//   );
// }
