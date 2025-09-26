import { FormProvider, useForm } from "react-hook-form";
import TipTapEditor, { TipTapEditorRef } from "../TipTap_Editor/TipTapEditor";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCreatingComment } from "../../_redux/comment/commentSelector";
import { AppDispatch } from "../../_redux/store";
import {
  createCommentThunk,
  getCommentThunk,
} from "../../_redux/comment/commentThunk";
import { GetBlogByIdDto } from "../../_models/GetBlogByIdDto";
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
  const methods = useForm<{ comment: string }>({
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = () => {
    tiptapEditorRef.current?.setEditorBufferContentToFormContext();
    dispatch(
      createCommentThunk({
        content: methods.getValues("comment"),
        blogId: props.blogDetails.id,
        userId: "", //bypasses the backend requirement for an empty string
      })
    );
  };

  useEffect(() => {
    if (!isCreatingComment && props?.blogDetails?.id)
      dispatch(
        getCommentThunk({
          blogId: props.blogDetails.id,
          pageNumber: 1,
          pageSize: 5,
        })
      );
  }, [dispatch, isCreatingComment, props.blogDetails]);
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
