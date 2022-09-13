import { ReactNode } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const getNodeText = (node: ReactNode): string => {
  if (['string', 'number'].includes(typeof node)) return node as string;
  if (node instanceof Array) return node.map(getNodeText).join(' ');
  // @ts-ignore
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
  return '';
};
