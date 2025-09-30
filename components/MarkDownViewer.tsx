import MDEditor from "@uiw/react-md-editor";

export default function MarkDownViewer({
  markDownText,
}: {
  markDownText: string;
}) {
  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor.Markdown source={markDownText} />
    </div>
  );
}
