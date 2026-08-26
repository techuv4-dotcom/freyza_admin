import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";

import "./editor.css";

interface RichTextEditorProps {
  label?: string;
  value: string;
  placeholder?: string;

  onChange: (value: string) => void;

  // Formik Support
  onBlur?: () => void;
}

const RichTextEditor = ({
  label,
  value,
  placeholder,
  onChange,
  onBlur,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Placeholder.configure({
        placeholder: placeholder || "Start writing...",
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: "min-h-[250px] p-4 outline-none focus:outline-none",
      },
    },
  });

  /**
   * Sync editor when value changes
   * (Useful in Edit Forms)
   */
  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold">{label}</label>}

      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
        {/* Toolbar */}

        <div className="flex flex-wrap items-center gap-2 border-b bg-gray-50 p-3">
          {/* Bold */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded-lg p-2 transition ${
              editor.isActive("bold")
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Bold size={18} />
          </button>

          {/* Italic */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded-lg p-2 transition ${
              editor.isActive("italic")
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Italic size={18} />
          </button>

          {/* Underline */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded-lg p-2 transition ${
              editor.isActive("underline")
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <UnderlineIcon size={18} />
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          {/* H1 */}
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`rounded-lg p-2 transition ${
              editor.isActive("heading", { level: 1 })
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Heading1 size={18} />
          </button>

          {/* H2 */}
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`rounded-lg p-2 transition ${
              editor.isActive("heading", { level: 2 })
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Heading2 size={18} />
          </button>

          {/* H3 */}
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`rounded-lg p-2 transition ${
              editor.isActive("heading", { level: 3 })
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Heading3 size={18} />
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          {/* Bullet List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded-lg p-2 transition ${
              editor.isActive("bulletList")
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <List size={18} />
          </button>

          {/* Ordered List */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded-lg p-2 transition ${
              editor.isActive("orderedList")
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <ListOrdered size={18} />
          </button>

          {/* Quote */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded-lg p-2 transition ${
              editor.isActive("blockquote")
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <Quote size={18} />
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          {/* Undo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="rounded-lg p-2 transition hover:bg-gray-200"
          >
            <Undo2 size={18} />
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="rounded-lg p-2 transition hover:bg-gray-200"
          >
            <Redo2 size={18} />
          </button>
        </div>

        {/* Editor */}

        <EditorContent editor={editor} onBlur={onBlur} />
      </div>
    </div>
  );
};

export default RichTextEditor;
