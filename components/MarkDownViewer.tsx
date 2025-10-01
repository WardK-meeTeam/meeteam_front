import MDEditor from "@uiw/react-md-editor";

export default function MarkDownViewer({
  markDownText,
  textColor = "black",
}: {
  markDownText: string;
  textColor?: string;
}) {
  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor.Markdown
        source={markDownText}
        style={{ backgroundColor: "transparent", color: textColor }}
      />
    </div>
  );
}
