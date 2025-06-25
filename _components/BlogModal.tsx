import { LOGGED_IN_USER } from "@/_constants/Auth";
import { COLOR_WHITE } from "@/_constants/Colors";
import { FONT_LEXEND, FONTSTYLE_SUBTEXT3 } from "@/_constants/Fonts";
import { CREATED, SUCCESS, UNAUTHORIZED } from "@/_constants/ResponseCodes";
import { createBlogSchema } from "@/_constants/ValidationSchema";
import { CreateBlog } from "@/_models/CreateBlog";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { clearCreateBlogResponse } from "@/_redux/blogModal/blogModalActions";
import {
  selectBlog,
  selectCreateBlogResponse,
  selectUpdateMode,
} from "@/_redux/blogModal/blogModalSelector";
import { setIsLoading, setVisibility } from "@/_redux/blogModal/blogModalSlice";
import {
  createBlogThunk,
  updateBlogThunk,
} from "@/_redux/blogModal/blogModalThunk";
import { setSnackbarMessage } from "@/_redux/snackbar/snackbarActions";
import { AppDispatch } from "@/_redux/store";
import { deserialize } from "@/utils/JsonUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBlog } from "../_models/UpdateBlog";
import "../app/globals.css";
import Button, { ButtonVariants } from "./AtomicComponents/Button";
import ImageUploader from "./AtomicComponents/ImageUploader";
import TextInput from "./AtomicComponents/TextInput";
import { TipTapEditor } from "./TipTap_Editor/TipTapEditor";

export default function BlogModal() {
  const backdropClassname = `fixed inset-0 bg-gray-500/50 transition-opacity 
                              flex flex-col justify-center items-center py-6`;
  const modalClassname = `z-40 w-11/12 md:w-8/12 h-full rounded-lg px-4 py-3 flex flex-col 
                          space-y-5`;

  const dispatch = useDispatch<AppDispatch>();
  const apiResponse = useSelector(selectCreateBlogResponse);
  const isUpdateMode = useSelector(selectUpdateMode);
  const selectedBlog = useSelector(selectBlog);  
  const methods = useForm<CreateBlog>({
    resolver: yupResolver<CreateBlog>(createBlogSchema),
    ...(isUpdateMode &&
      selectedBlog && {
      defaultValues: {
          title: selectedBlog.title,
          isUpdateMode: isUpdateMode,
          content: selectedBlog?.content,
          description: selectedBlog.description,
          image: selectedBlog.image,
      },
    }),
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

  const buildUpdateBlog = (createBlog: CreateBlog): UpdateBlog => {
    return {
      id: selectedBlog?.id as string,
      content: createBlog.content,
      userId: getUserId(),
    };
  };

  const createNewBlog = () => {
    const newBlog = methods.getValues();
    newBlog.userId = getUserId();
    dispatch(setIsLoading(true));
    dispatch(createBlogThunk(newBlog));
  };

  const updateExistingBlog = () => {
    const existingBlog = methods.getValues();
    existingBlog.userId = getUserId();
    dispatch(setIsLoading(true));
    dispatch(updateBlogThunk(buildUpdateBlog(existingBlog)));
  };

  const onSubmit = () => {
    if (isUpdateMode) updateExistingBlog();
    else createNewBlog();
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
    else if (
      apiResponse &&
      (apiResponse.statusCode === CREATED || apiResponse.statusCode === SUCCESS)
    ) {
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
  const isUpdateMode = useSelector(selectUpdateMode);
  const { handleSubmit } = useFormContext();
  const dispatch = useDispatch();

  return (
    <div className={headerClassname}>
      <div className={titleClassname}>
        {isUpdateMode ? "Update the Blog" : " Create a Blog"}
      </div>
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
      <TipTapEditor error={errors["content"]?.message as string | undefined} />
    </div>
  );
}

function MetadataEditor() {
  const metadataContainerClassname = `flex flex-col md:flex-row md:space-x-3`;
  const textInputContainerClassname = `md:w-9/12 space-y-3 md:px-2`;
  const imageUploaderContainerClassname = `md:w-3/12`;
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const updateMode = useSelector(selectUpdateMode);
  const viewMode = updateMode;
  return (
    <div className={metadataContainerClassname}>
      <div className={imageUploaderContainerClassname}>
        <ImageUploader
          viewMode={viewMode}
          defaultImage={getValues("image")}
          onChange={(imageString) => setValue("image", imageString)}
          error={errors["image"]?.message as string | undefined}
        />
      </div>
      <div className={textInputContainerClassname}>
        <TextInput
          label="Title"
          {...register("title")}
          error={errors["title"]?.message as string | undefined}
          disabled={viewMode}
        />
        <TextInput
          label="Description"
          {...register("description")}
          error={errors["description"]?.message as string | undefined}
          disabled={viewMode}
        />
      </div>
    </div>
  );
}