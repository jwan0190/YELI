import { Fragment, type ReactNode } from "react";

type Props = {
  text: string;
};

const TOKEN = /<em>([\s\S]*?)<\/em>|<br\s*\/?>(?!\s*<\/em>)/gi;

export function RichText({ text }: Props): JSX.Element {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(<Fragment key={key++}>{text.slice(cursor, match.index)}</Fragment>);
    }
    if (match[1] !== undefined) {
      nodes.push(<em key={key++}>{match[1]}</em>);
    } else {
      nodes.push(<br key={key++} />);
    }
    cursor = TOKEN.lastIndex;
  }
  if (cursor < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(cursor)}</Fragment>);
  }

  return <>{nodes}</>;
}
