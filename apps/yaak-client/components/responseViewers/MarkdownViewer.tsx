import { Markdown } from "../Markdown";

interface Props {
  text: string;
}

export function MarkdownViewer({ text }: Props) {
  return (
    <div className="h-full overflow-auto pb-3 pr-2">
      <Markdown className="select-auto cursor-auto">{text}</Markdown>
    </div>
  );
}
