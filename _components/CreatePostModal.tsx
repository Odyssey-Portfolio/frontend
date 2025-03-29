import { COLOR_WHITE } from "@/_constants/Colors";
import { FONT_LEXEND, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import { Toggle } from "@radix-ui/react-toggle";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Strikethrough,
  Text,
} from "lucide-react";

interface CreatePostModalProps {
  closeAction: () => void;
  onChange: (content: string) => void;
}
export default function CreatePostModal(props: CreatePostModalProps) {
  const backdropClassname = `fixed inset-0 bg-gray-500/50 transition-opacity z-30 
                              flex flex-col justify-center items-center`;
  const modalClassname = `z-40 w-8/12 h-9/12 rounded-lg px-4 py-3 flex flex-col space-y-5`;

  return (
    <div className={backdropClassname}>
      <div className={modalClassname} style={{ backgroundColor: COLOR_WHITE }}>
        <HeaderSection {...props} />
        <EditorSection {...props} />
      </div>
    </div>
  );
}
function HeaderSection(props: CreatePostModalProps) {
  const headerClassname = ` flex flex-row justify-between items-center`;
  const titleClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT3}`;
  const closeBtnClassname = `inline-flex w-full justify-center rounded-md bg-red-600 px-3 
                              py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 
                              sm:ml-3 sm:w-auto`;
  return (
    <div className={headerClassname}>
      <div className={titleClassname}>Create a Post</div>
      <button
        type="button"
        className={closeBtnClassname}
        onClick={props.closeAction}
      >
        Close
      </button>
    </div>
  );
}

function EditorSection(props: CreatePostModalProps) {
  const editorClassname = `flex flex-col space-y-2`;
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: "hover:bg-red-500" },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-80 max-h-[10px] border rounded-md bg-slate-50 py-2 px-3 overflow-y-scroll",
      },
    },
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
  });
  return (
    <div className={editorClassname}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

interface MenuBarProps {
  editor: Editor | null;
}
function MenuBar(props: MenuBarProps) {
  const editor = props.editor;
  if (!editor) {
    return null;
  }

  const menuBarOptions = [
    {
      icon: <Heading1 className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Text className="w-6 h-6" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="w-6 h-6" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <AlignLeft className="w-6 h-6" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="w-6 h-6" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="w-6 h-6" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="w-6 h-6" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
  ];

  const menuBarClassname = `flex flex-row items-center border rounded-lg space-x-3 p-2`;

  return (
    <div className={menuBarClassname}>
      {menuBarOptions.map((option, key) => {
        return (
          <Toggle
            key={key}
            pressed={option.pressed}
            onPressedChange={option.onClick}
          >
            {option.icon}
          </Toggle>
        );
      })}
    </div>
  );
}
