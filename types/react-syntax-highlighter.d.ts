declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react';

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children: string;
    PreTag?: string | ComponentType<any>;
    [key: string]: any;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const Light: ComponentType<SyntaxHighlighterProps>;
  
  const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const styles: { [key: string]: any };
  export default styles;
}