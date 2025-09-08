"use client";
import { ICommand, commands } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useProjectGenerateStore } from "@/store/projectGenerateStore";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

/** ── 커스텀: 밑줄 버튼 ───────────────────────────────── */
const underlineCommand: ICommand = {
  name: "underline",
  keyCommand: "underline",
  buttonProps: { "aria-label": "밑줄" },
  render: (command, disabled, executeCommand) => (
    <button
      type="button"
      disabled={disabled}
      onClick={() => executeCommand(command)}
      className="mdx-btn"
      title="밑줄"
      aria-label="밑줄"
    >
      <span className="underline font-semibold">U</span>
    </button>
  ),
  execute: (state, api) => {
    const text = state.selectedText || "";
    api.replaceSelection(`<u>${text}</u>`);
  },
};

/** ── 커스텀: 제목(제목1~4) 버튼 ───────────────────────── */
const titleCommands: ICommand[] = [
  {
    ...commands.title1,
    render: (cmd, disabled, exec) => (
      <button
        type="button"
        disabled={disabled}
        onClick={() => exec(cmd)}
        className="mdx-btn"
        title="제목1"
        aria-label="제목1"
      >
        <b>제목1</b>
      </button>
    ),
  },
  {
    ...commands.title2,
    render: (cmd, disabled, exec) => (
      <button
        type="button"
        disabled={disabled}
        onClick={() => exec(cmd)}
        className="mdx-btn"
        title="제목2"
        aria-label="제목2"
      >
        <b>제목2</b>
      </button>
    ),
  },
  {
    ...commands.title3,
    render: (cmd, disabled, exec) => (
      <button
        type="button"
        disabled={disabled}
        onClick={() => exec(cmd)}
        className="mdx-btn"
        title="제목3"
        aria-label="제목3"
      >
        <b>제목3</b>
      </button>
    ),
  },
];

/** ── 사용할 커맨드 구성 ─────────────────────────────── */
const customCommands: ICommand[] = [
  ...titleCommands,
  commands.bold,
  commands.italic,
  commands.strikethrough,
  underlineCommand,
  commands.divider,
  commands.link,
  commands.quote,
  commands.code,
  commands.hr,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.codeBlock,
];

export default function MarkDown() {
  const maxSize = 800;
  const text = useProjectGenerateStore((state) => state.projectDescription);
  const setText = useProjectGenerateStore(
    (state) => state.setProjectDescription,
  );

  return (
    <div data-color-mode="light" className="mdx-modern flex flex-col gap-2">
      <MDEditor
        className="rounded-2xl border border-mtm-light-gray resize-none"
        value={text}
        onChange={(val) => {
          if ((val ?? "").length <= maxSize) setText(val ?? "");
        }}
        commands={customCommands}
        height={400}
        textareaProps={{
          style: { resize: "none" },
          placeholder: `설명글은 ${maxSize}자 이내로 작성해주세요!`,
        }}
      />
      <div className="flex gap-1 text-[12px] justify-end">
        <span>{text.length}</span>
        <span className="text-mtm-text-gray">/ {maxSize}자</span>
      </div>

      {/* 내부 스타일 정의 */}
      <style jsx global>{`
        /* 리사이즈 바 숨기기 */
        .w-md-editor .w-md-editor-bar {
          display: none !important;
        }

        /* 툴바 스타일 */
        .mdx-btn {
          min-width: 32px;
          height: 32px;
          padding: 0 8px;
          border-radius: 8px;
          font-size: 13px;
          display: grid;
          place-items: center;
          transition:
            background 0.2s ease,
            transform 0.05s ease;
        }
        .mdx-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        .mdx-btn:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
}
