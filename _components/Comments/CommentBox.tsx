import { FormProvider, useForm } from "react-hook-form";
import TipTapEditor, { TipTapEditorRef } from "../TipTap_Editor/TipTapEditor";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCreatingComment } from "../../_redux/comment/commentSelector";
import { AppDispatch } from "../../_redux/store";
import { createCommentThunk } from "../../_redux/comment/commentThunk";
import { GetBlogByIdDto } from "../../_models/GetBlogByIdDto";
import { nanoid } from "@reduxjs/toolkit";
import { setSnackbarMessage } from "../../_redux/snackbar/snackbarActions";

interface CommentBoxProps {
  blogDetails: GetBlogByIdDto;
}
export default function CommentBox(props: CommentBoxProps) {
  const htmlContentPropName = "comment";
  const isCreatingComment = useSelector(selectIsCreatingComment);
  const dispatch = useDispatch<AppDispatch>();
  const excludedMenuOptions = [
    "heading1",
    "heading2",
    "heading3",
    "highlighter",
    "paragraph",
    "alignLeft",
    "alignRight",
    "alignCenter",
    "alignJustify",
    "addImage",
    "addTable",
    "addTableRow",
    "removeTableRow",
  ];
  const tiptapEditorRef = useRef<TipTapEditorRef>(null);
  const COMMENT_TEXT_EXTRACTION_REGEX = /<p[^>]*>(.*?)<\/p>/i;
  const methods = useForm<{ comment: string }>({
    defaultValues: {
      comment: "",
    },
  });
  const extractCommentTextFromCommentHtml = (commentHtml: string) => {
    if (!commentHtml) return "";
    const match = commentHtml.match(COMMENT_TEXT_EXTRACTION_REGEX);
    return match && match[1].trim();
  };
  const onSubmit = () => {
    tiptapEditorRef.current?.setEditorBufferContentToFormContext();
    const commentHtml = methods.getValues("comment");
    const commentText = extractCommentTextFromCommentHtml(commentHtml);
    if (!commentText) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: "Comment is a required field.",
          type: "error",
        })
      );
      return;
    }
    dispatch(
      createCommentThunk({
        content: methods.getValues("comment"),
        blogId: props.blogDetails.id,
        userId: "", //bypasses the backend requirement for an empty string
      })
    );
  };
  return (
    <div>
      <FormProvider {...methods}>
        <TipTapEditor
          ref={tiptapEditorRef}
          isSubmitting={isCreatingComment}
          htmlContentPropName={htmlContentPropName}
          excludedMenuOptions={excludedMenuOptions}
          submitCallback={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </div>
  );
}
