import { LOGGED_IN_USER } from "@/_constants/Auth";
import { COLOR_WHITE } from "@/_constants/Colors";
import { FONT_LEXEND, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import { CREATED, UNAUTHORIZED } from "@/_constants/ResponseCodes";
import { createBlogSchema } from "@/_constants/ValidationSchema";
import { CreateBlog } from "@/_models/CreateBlog";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { clearCreateBlogResponse } from "@/_redux/createBlogModal/createBlogModalActions";
import { selectCreateBlogResponse } from "@/_redux/createBlogModal/createBlogModalSelector";
import {
  setIsLoading,
  setVisibility,
} from "@/_redux/createBlogModal/createBlogModalSlice";
import { createBlogThunk } from "@/_redux/createBlogModal/createBlogModalThunk";
import { setSnackbarMessage } from "@/_redux/snackbar/snackbarActions";
import { AppDispatch } from "@/_redux/store";
import { deserialize } from "@/utils/JsonUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toggle } from "@radix-ui/react-toggle";
import { nanoid } from "@reduxjs/toolkit";
import BulletList from "@tiptap/extension-bullet-list";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
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
  List,
  ListOrdered,
  PlusCircleIcon,
  Strikethrough,
  TableIcon,
  Text,
} from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../app/globals.css";
import Button, { ButtonVariants } from "./AtomicComponents/Button";
import ImageUploader from "./AtomicComponents/ImageUploader";
import TextInput from "./AtomicComponents/TextInput";

export default function BlogModal() {
  const backdropClassname = `fixed inset-0 bg-gray-500/50 transition-opacity 
                              flex flex-col justify-center items-center py-6`;
  const modalClassname = `z-40 w-11/12 md:w-8/12 h-full rounded-lg px-4 py-3 flex flex-col 
                          space-y-5`;
  const dispatch = useDispatch<AppDispatch>();
  const apiResponse = useSelector(selectCreateBlogResponse);
  const methods = useForm<CreateBlog>({
    resolver: yupResolver<CreateBlog>(createBlogSchema),
  });

  const getUserId = (): string => {
    const loggedInUserFromSessionStorage =
      sessionStorage.getItem(LOGGED_IN_USER);
    if (loggedInUserFromSessionStorage) {
      const loggedInUser = deserialize<LoggedInUser>(
        loggedInUserFromSessionStorage
      );
      return loggedInUser.id;
    }
    return "";
  };

  const onSubmit = () => {
    const newBlog = methods.getValues();
    newBlog.userId = getUserId();
    dispatch(setIsLoading(true));
    dispatch(createBlogThunk(newBlog));
  };

  useEffect(() => {
    if (apiResponse && apiResponse.statusCode === UNAUTHORIZED)
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: apiResponse.message,
          type: "error",
        })
      );
    else if (apiResponse && apiResponse.statusCode === CREATED) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: apiResponse.message,
          type: "success",
        })
      );
      window.location.reload();
    }
    return () => {
      dispatch(clearCreateBlogResponse());
    };
  }, [dispatch, apiResponse]);

  if (typeof window === "undefined") return null; // SSR-safe
  const modalRoot = document.body;
  if (!modalRoot) return null;
  return createPortal(
    <div className={backdropClassname}>
      <FormProvider {...methods}>
        <div
          className={modalClassname}
          style={{ backgroundColor: COLOR_WHITE }}
        >
          <HeaderSection onSubmit={onSubmit} />
          <EditorSection />
        </div>
      </FormProvider>
    </div>,
    modalRoot
  );
}

interface HeaderSectionProps {
  onSubmit: () => void;
}
function HeaderSection(props: HeaderSectionProps) {
  const headerClassname = `flex flex-col md:flex-row justify-between items-center`;
  const titleClassname = `${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT3}`;
  const buttonGroupClassname = `flex flex-row space-x-2 items-center`;

  const { handleSubmit } = useFormContext();
  const dispatch = useDispatch();

  return (
    <div className={headerClassname}>
      <div className={titleClassname}>Create a Blog</div>
      <div className={buttonGroupClassname}>
        <Button label="Submit" onClick={handleSubmit(props.onSubmit)} />
        <Button
          label="Close"
          variant={ButtonVariants.DANGER}
          onClick={() => dispatch(setVisibility(false))}
        />
      </div>
    </div>
  );
}

function EditorSection() {
  const editorSectionClassname = `space-y-3 overflow-y-scroll`;
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div className={editorSectionClassname}>
      <MetadataEditor />
      <MainEditor error={errors["content"]?.message as string | undefined} />
    </div>
  );
}

function MetadataEditor() {
  const metadataContainerClassname = `flex flex-col md:flex-row md:space-x-3`;
  const textInputContainerClassname = `md:w-9/12 space-y-3 md:px-2`;
  const imageUploaderContainerClassname = `md:w-3/12`;
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={metadataContainerClassname}>
      <div className={imageUploaderContainerClassname}>
        <ImageUploader
          onChange={(imageString) => setValue("image", imageString)}
          error={errors["image"]?.message as string | undefined}
        />
      </div>
      <div className={textInputContainerClassname}>
        <TextInput
          label="Title"
          {...register("title")}
          error={errors["title"]?.message as string | undefined}
        />
        <TextInput
          label="Description"
          {...register("description")}
          error={errors["description"]?.message as string | undefined}
        />
      </div>
    </div>
  );
}

interface MainEditorProps {
  error?: string;
}
function MainEditor(props: MainEditorProps) {
  const editorWrapperClassname = `flex flex-col space-y-2`;
  const editorClassname = `h-80 border rounded-md bg-slate-50 py-2 px-3 overflow-y-scroll max-w-none prose`;
  const errorClassname = `text-red-500 text-sm font-bold`;
  const { setValue } = useFormContext();
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: editorClassname,
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: "hover:bg-red-500" },
      }),
      Table.configure({
        resizable: true,
      }),
      TableHeader,
      TableRow,
      TableCell,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-5",
        },
      }),
      TableHeader,
    ],
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
    },
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
        // Step 1: Insert the table
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
        // Step 1: Insert the table
        editor.chain().focus().addRowAfter().run();
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
