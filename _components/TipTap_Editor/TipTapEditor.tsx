import { useFormContext } from "react-hook-form";
import { Toggle } from "@radix-ui/react-toggle";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Highlight from "@tiptap/extension-highlight";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Paragraph from '@tiptap/extension-paragraph'
import StarterKit from "@tiptap/starter-kit";
import {
    Heading1, Heading2, Heading3,
    Bold, Italic, Strikethrough, Highlighter, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, TableIcon, PlusCircleIcon, MinusCircleIcon, ImageIcon, Text
} from "lucide-react";
import { useSelector } from "react-redux";
import ImageResize from "tiptap-extension-resize-image";
import Image from "@tiptap/extension-image";
import { selectUpdateMode } from "../../_redux/blogModal/blogModalSelector";
import { FONTSTYLE_PARAGRAPH1, FONTSTYLE_PARAGRAPH2, FONT_POPPINS } from "../../_constants/Fonts";
import "./TipTapEditor.css"

interface TipTapEditorProps {
    error?: string;
}
export function TipTapEditor(props: TipTapEditorProps) {
    const editorWrapperClassname = `flex flex-col space-y-2`;    
    const editorClassname = `h-80 border rounded-md bg-slate-50 py-2 px-3 overflow-y-scroll max-w-none`
    const editorTextClassname = `${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH2}`    
    const errorClassname = `text-red-500 text-sm font-bold`;
    const tableCellBaseClassname = `px-3 font-bold`
    const { getValues, setValue } = useFormContext();
    const updateMode = useSelector(selectUpdateMode);
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: editorClassname,
            },
        },
        extensions: [
            StarterKit,
            HardBreak.extend({
                addKeyboardShortcuts() {
                    return {
                        Enter: () => this.editor.commands.setHardBreak()
                    }
                }
            }),
            Paragraph.configure({
                HTMLAttributes: {
                    class: editorTextClassname,
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight.configure({
                multicolor: true,
                HTMLAttributes: { class: "hover:bg-red-500" },
            }),            
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: `table-auto md:table-fixed border-collapse border border-gray-400`}

            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: `border border-gray-300 bg-blue-50 ${tableCellBaseClassname}`,
                    
                }
            }),            
            TableRow,
            TableCell.configure({
                HTMLAttributes: {
                    class: `border border-gray-300 ${tableCellBaseClassname}`
                }
            }),
            Image.configure({
                allowBase64: true,
                inline:true,
            }),
            ImageResize,
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-5",
                },
            }),
        ],
        immediatelyRender: true,
        onUpdate: ({ editor }) => {
            setValue("content", editor.getHTML());
        },
        content: updateMode && getValues("content"),
    });

    return (
        <div className={editorWrapperClassname}>
            {props.error && <div className={errorClassname}>{props.error}</div>}
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
        {
            icon: <List className="w-6 h-6" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="w-6 h-6" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <TableIcon className="w-6 h-6" />,
            onClick: () => {                
                editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 2, cols: 3, withHeaderRow: true })
                    .run();
            },
            pressed: editor.isActive("table"),
        },
        {
            icon: <PlusCircleIcon className="w-6 h-6" />,
            onClick: () => {
                editor.chain().focus().addRowAfter().run();
            },
            pressed: editor.isActive("table"),
        },
        {
            icon: <MinusCircleIcon className="w-6 h-6" />,
            onClick: () => {
                editor.chain().focus().deleteRow().run();
            },
            pressed: editor.isActive("table"),
        },
        {
            icon: <ImageIcon className="w-6 h-6" />,
            onClick: () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';

                input.addEventListener('change', (e: any) => {                                    
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const url = e.target?.result;
                            console.log('Image URL:', url);
                            editor.chain().focus().setImage({ src: url }).run();
                        };

                        reader.readAsDataURL(file);
                    }
                });

                input.click();
            },
            pressed: editor.isActive("table"),
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
